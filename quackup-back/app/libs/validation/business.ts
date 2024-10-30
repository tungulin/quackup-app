import { Request, Response, NextFunction } from 'express';
import { getLockTimeDuckForUser } from 'helpers/business';
import db from 'libs/db';
import moment from 'moment';

export const isValidBuyDuck = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const userDB = await db('users').where({ telegramId: req.initTelegramData.user.id }).first();
  const duckDB = await db('ducks').where({ id }).first();
  const lock = await db('locks').where('duckId', duckDB.id).first();
  const countBoughtDucksByLevel = await db('logs')
    .where({ type: 'buy', userId: userDB.telegramId, duckId: duckDB.id })
    .count()
    .then((resp) => Number(resp[0].count));

  let maxLevelUserDuck = await db('slots')
    .join('ducks', 'ducks.id', 'slots.duckId')
    .where({ 'slots.userId': userDB.telegramId })
    .max('level')
    .then((resp) => (resp[0].max === null ? 1 : resp[0].max));

  let duckPrice = duckDB.price;
  let maxDuckLevelByCoin = 0;

  if (maxLevelUserDuck === 1 || maxLevelUserDuck === 2) {
    maxDuckLevelByCoin = 1;
  }

  if (maxLevelUserDuck === 3 || maxLevelUserDuck === 4) {
    maxDuckLevelByCoin = 2;
  }

  if (maxLevelUserDuck >= 5) {
    maxDuckLevelByCoin = maxLevelUserDuck - 3;
  }

  if (countBoughtDucksByLevel > 0) {
    duckPrice = Math.round(Math.pow(lock.coefficient, countBoughtDucksByLevel) * duckPrice);
  }

  if (+userDB.coinBalance < +duckPrice) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'Not enough balance to purchase duck.',
    });
  }

  const slotsDB = await db('slots').where({ userId: userDB.telegramId });

  if (slotsDB.length + 1 > 8) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'No available slots.',
    });
  }

  if (duckDB.level > maxDuckLevelByCoin) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'You cannot buy this duck. Your level is low.',
    });
  }

  const lockTime = await getLockTimeDuckForUser(userDB.telegramId, duckDB.id);

  if (lockTime.isLock) {
    return res.status(403).send({
      type: 'ValidationError',
      message: `You will be able to buy a duck after a certain time.`,
    });
  }

  next();
};

export const isValidCrossingDucks = async (req: Request, res: Response, next: NextFunction) => {
  const { firstSlotId, secondSlotId } = req.body;
  const userDB = await db('users').where({ telegramId: req.initTelegramData.user.id }).first();

  const userFirstDuckDB = await db('slots')
    .join('ducks', 'ducks.id', 'slots.duckId')
    .where({ userId: userDB.telegramId, 'slots.id': firstSlotId })
    .select('slots.id', 'ducks.level')
    .first();

  const userSecondDuckDB = await db('slots')
    .join('ducks', 'ducks.id', 'slots.duckId')
    .where({ userId: userDB.telegramId, 'slots.id': secondSlotId })
    .select('slots.id', 'ducks.level')
    .first();

  if (!userFirstDuckDB || !userSecondDuckDB) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'You have no right to breed this duck.',
    });
  }

  if (userFirstDuckDB.level !== userSecondDuckDB.level) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'These ducks are of different levels.',
    });
  }

  const nextLevel = userFirstDuckDB.level + 1;

  const duckNextLevelDB = await db('ducks').where({ level: nextLevel }).first();

  if (!duckNextLevelDB) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'You have maximum duck. New ducks coming soon!',
    });
  }

  next();
};

export const isValidDeleteSlot = async (req: Request, res: Response, next: NextFunction) => {
  const { slotId } = req.body;
  const user = req.initTelegramData.user;

  const slotDuckDB = await db('slots')
    .join('ducks', 'ducks.id', 'slots.duckId')
    .where({ userId: user.id, 'slots.id': slotId })
    .select('slots.id', 'ducks.level')
    .first();

  if (!slotDuckDB) {
    return res.status(403).send({
      type: 'ValidationError',
      message: 'You have no right to breed this duck.',
    });
  }

  next();
};
