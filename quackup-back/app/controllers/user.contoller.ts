import db from 'libs/db';
import { type InitDataParsed, type User } from '@telegram-apps/init-data-node';
import moment from 'moment';
import { getDuckPrice, getMaxDuckLevelByCoin } from 'helpers/business';

const initUser = async (initTelegramData: Required<InitDataParsed>) => {
  let user = await db('users').where({ telegramId: initTelegramData?.user.id }).first();
  let profitCoinPerMinute = 0;
  let offlineReward = 0;

  if (user) {
    user.isNew = false;
    const slots = await db('slots')
      .where({ userId: initTelegramData?.user.id })
      .join('ducks', 'ducks.id', 'slots.duckId');

    profitCoinPerMinute = slots.reduce((acc, slots) => (acc += slots.profitPerMinute), 0);

    if (profitCoinPerMinute > 0) {
      const lastClaimRewardLog = await db('logs')
        .where({ type: 'login', userId: user.telegramId })
        .orderBy('time', 'desc')
        .first();

      //prettier-ignore
      if (lastClaimRewardLog) {
        const isMoreThan10MinPassed = moment.utc() > moment(lastClaimRewardLog.time).utc(true).add(10, 'minutes')
        const isMoreThan3HoursPassed = moment.utc() > moment(lastClaimRewardLog.time).utc(true).add(3, 'hours')
        
        if(isMoreThan10MinPassed && !isMoreThan3HoursPassed) {
          const unixDefference = moment.utc().unix() - moment(lastClaimRewardLog.time).utc(true).unix();
          const factor = Math.round(unixDefference / 60);
          offlineReward = factor * profitCoinPerMinute;
          await db('logs').insert({ type: 'claimOfflineReward', userId: user.telegramId });
        }

        if(isMoreThan10MinPassed && isMoreThan3HoursPassed) {
          const factor = 3 * 60
          offlineReward = factor * profitCoinPerMinute;
          await db('logs').insert({ type: 'claimOfflineReward', userId: user.telegramId });
        }
      }
    }
  }

  if (!user) {
    let data: any = {
      ...initTelegramData.user,
      telegramId: initTelegramData.user.id,
      coinBalance: 500,
    };

    delete data.id;

    user = await db('users')
      .insert(data)
      .returning('*')
      .then((val) => val[0]);

    await db('logs').insert({ type: 'claimOfflineReward', userId: user.telegramId });

    user.isNew = true;
  }

  const maxDuckLevelByCoin = await getMaxDuckLevelByCoin(user.telegramId);

  user.duckByGenerate = await db('ducks')
    .where({ level: maxDuckLevelByCoin })
    .first()
    .then(async (duck) => {
      duck.price = await getDuckPrice(user.telegramId, duck.id);
      return duck;
    });

  user.profitCoinPerMinute = profitCoinPerMinute;
  user.offlineReward = offlineReward;

  await db('logs').insert({ type: 'login', userId: user.telegramId });
  return user;
};

const tapDuck = async ({ count, user }: { count: number; user: User }) => {
  await db('users').where({ telegramId: user.id }).increment({ coinBalance: count });
  const userDB = await db('users').where({ telegramId: user.id }).first();

  return {
    userId: userDB.id,
    coinBalance: userDB.coinBalance,
    count,
    message: 'Success',
  };
};

export default {
  initUser,
  tapDuck,
};
