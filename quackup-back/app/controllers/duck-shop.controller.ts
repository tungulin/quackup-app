import db from 'libs/db';

import { User } from '@telegram-apps/init-data-node';
import moment from 'moment';
import { getDuckPrice, getLockTimeDuckForUser, getMaxDuckLevelByCoin } from 'helpers/business';

const buyDuck = async ({ id, user }: { id: number; user: User }) => {
  const duckDB = await db('ducks').where({ id }).first();
  await db('users').where({ telegramId: user.id }).decrement({ coinBalance: duckDB.price });

  const slot = await db('slots')
    .insert({ userId: user.id, duckId: duckDB.id })
    .returning('*')
    .then((resp) => resp[0]);

  await db('logs').insert({ type: 'buy', userId: user.id, duckId: duckDB.id });

  const slotDB = await db('slots')
    .where('slots.id', slot.id)
    .join('ducks', 'ducks.id', 'slots.duckId')
    .select('slots.id', 'ducks.level', 'ducks.profitPerMinute', 'ducks.image')
    .first();

  const newDuckShop = await db('ducks').where({ id }).first();

  newDuckShop.isLockByTime = false;
  newDuckShop.UTCLockTime = null;

  const lock = await db('locks').where({ duckId: newDuckShop.id }).first();
  const countBought = await db('logs')
    .where({ type: 'buy', userId: user.id, duckId: newDuckShop.id })
    .count()
    .then((resp) => Number(resp[0].count));

  if (countBought > 0) {
    newDuckShop.price = Math.round(Math.pow(lock.coefficient, countBought) * newDuckShop.price);
  }

  const lockTime = await getLockTimeDuckForUser(user.id, newDuckShop.id);
  if (lockTime.isLock) {
    newDuckShop.isLockByTime = true;
    newDuckShop.UTCLockTime = lockTime.UTCLockTime;
  }

  const maxDuckLevelByCoin = await getMaxDuckLevelByCoin(user.id);
  const newDuckByGenerate = await db('ducks')
    .where({ level: maxDuckLevelByCoin })
    .first()
    .then(async (duck) => {
      duck.price = await getDuckPrice(user.id, duck.id);
      return duck;
    });

  return {
    slot: slotDB,
    newDuckShop,
    newDuckByGenerate,
  };
};

const listDucksShop = async ({ user }: { user: User }) => {
  let ducks = await db('ducks').orderBy('level');
  const maxDuckLevelByCoin = await getMaxDuckLevelByCoin(user.id);

  ducks.map((duck) => {
    duck.isLock = false;
    duck.isLockByTime = false;
    duck.UTCLockTime = null;
    if (duck.level > maxDuckLevelByCoin) duck.isLock = true;
    duck.isPurchaseByDuckCoin = false;
    return duck;
  });

  for (let duck of ducks) {
    const lastPurchaseLog = await db('logs')
      .where({ type: 'buy', userId: user.id, duckId: duck.id })
      .orderBy('id', 'desc')
      .first();

    if (lastPurchaseLog) {
      const lockTime = await getLockTimeDuckForUser(user.id, duck.id);
      duck.price = await getDuckPrice(user.id, duck.id);

      if (lockTime.isLock) {
        duck.isLockByTime = true;
        duck.UTCLockTime = lockTime.UTCLockTime;
      }
    }
  }

  return ducks;
};

export default {
  buyDuck,
  listDucksShop,
};
