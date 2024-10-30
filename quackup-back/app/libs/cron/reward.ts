import db from 'libs/db';
import moment from 'moment';

const receiving = async () => {
  const users = await db('users');

  for (let user of users) {
    const lastClaimRewardLog = await db('logs')
      .where({ type: 'login', userId: user.telegramId })
      .orderBy('time', 'desc')
      .first();

    //prettier-ignore
    if(lastClaimRewardLog) {
      const isMoreThan3HoursPassed = moment.utc() > moment(lastClaimRewardLog.time).utc(true).add(3, 'hours')

      if (!isMoreThan3HoursPassed) {
        const userSlots = await db('slots')
          .where('slots.userId', user.telegramId)
          .join('ducks', 'ducks.id', 'slots.duckId');
  
        const profitCoinPerMinute = userSlots.reduce((acc, slot) => (acc += slot.profitPerMinute), 0);
  
        if (profitCoinPerMinute > 0)
          await db('users')
            .where('users.telegramId', user.telegramId)
            .increment('coinBalance', profitCoinPerMinute);
      }
    }
  }
};

export default {
  receiving,
};
