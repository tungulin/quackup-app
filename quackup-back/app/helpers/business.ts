import db from 'libs/db';
import moment from 'moment';

const getMaxDuckLevelByCoin = async (userId: number): Promise<number> => {
  let maxDuckLevelByCoin = 1;
  let maxLevelUserDuck = await db('slots')
    .join('ducks', 'ducks.id', 'slots.duckId')
    .where({ 'slots.userId': userId })
    .max('level')
    .then((resp) => (resp[0].max === null ? 1 : resp[0].max));

  if (maxLevelUserDuck === 3 || maxLevelUserDuck === 4) {
    maxDuckLevelByCoin = 2;
  }

  if (maxLevelUserDuck >= 5) {
    maxDuckLevelByCoin = maxLevelUserDuck - 3;
  }

  return maxDuckLevelByCoin;
};

const getLockTimeDuckForUser = async (userId: number, duckId: number) => {
  let isLock = false;
  let UTCLockTime = null;

  const lastPurchaseLog = await db('logs')
    .where({ type: 'buy', userId, duckId })
    .orderBy('id', 'desc')
    .first();

  if (lastPurchaseLog) {
    const countBoughtDucksByDay = await db('logs')
      .where({ type: 'buy', userId, duckId })
      .andWhereBetween('time', [moment().startOf('day'), moment().add(1, 'day').startOf('day')])
      .count()
      .then((resp) => Number(resp[0].count));

    if (countBoughtDucksByDay > 0) {
      const lock = await db('locks').where('duckId', duckId).first();
      let lockTime = lock.lockTime.find((l: any) => l.count === countBoughtDucksByDay);
      if (!lockTime) lockTime = lock.lockTime[lock.lockTime.length - 1];

      if (moment().utc() < moment(lastPurchaseLog.time).utc(true).add(lockTime.time, 'seconds')) {
        UTCLockTime = moment(lastPurchaseLog.time).utc(true).add(lockTime.time, 'seconds');
        isLock = true;
      }
    }
  }

  return {
    isLock,
    UTCLockTime,
  };
};

const getDuckPrice = async (userId: number, duckId: number): Promise<number> => {
  let price: number = await db('ducks')
    .where({ id: duckId })
    .first()
    .then((resp) => resp.price);

  const lock = await db('locks').where({ duckId }).first();

  const countBought = await db('logs')
    .where({ type: 'buy', userId, duckId })
    .count()
    .then((resp) => Number(resp[0].count));

  if (countBought > 0) {
    price = Math.round(Math.pow(lock.coefficient, countBought) * price);
  }

  return price;
};

export { getMaxDuckLevelByCoin, getLockTimeDuckForUser, getDuckPrice };
