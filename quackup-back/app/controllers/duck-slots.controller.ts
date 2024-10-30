import db from 'libs/db';
import { User } from '@telegram-apps/init-data-node';

type CrossingDucks = { user: User; firstSlotId: number; secondSlotId: number };
type DeleteDuck = { user: User; slotId: number };

const listSlots = async ({ user }: { user: User }) => {
  const slots = await db('slots')
    .where('userId', user.id)
    .join('ducks', 'ducks.id', 'slots.duckId')
    .select('slots.id', 'ducks.level', 'ducks.price', 'ducks.profitPerMinute', 'ducks.image');

  return slots;
};

const crossingDucks = async ({ user, firstSlotId, secondSlotId }: CrossingDucks) => {
  const userDB = await db('users').where({ telegramId: user.id }).first();

  const userFirstDuckDB = await db('slots')
    .join('ducks', 'ducks.id', 'slots.duckId')
    .where({ userId: userDB.telegramId, 'slots.id': firstSlotId })
    .select('slots.id', 'ducks.level')
    .first();

  const nextLevelDuck = userFirstDuckDB.level + 1;
  const nextLevelDuckDB = await db('ducks').where({ level: nextLevelDuck }).first();

  await db('slots').where({ id: firstSlotId }).delete();
  await db('slots').where({ id: secondSlotId }).delete();

  const slot = await db('slots')
    .insert({ userId: user.id, duckId: nextLevelDuckDB.id })
    .returning('*')
    .then((resp) => resp[0]);

  const slotDB = await db('slots')
    .where('slots.id', slot.id)
    .join('ducks', 'ducks.id', 'slots.duckId')
    .select('slots.id', 'ducks.level', 'ducks.price', 'ducks.profitPerMinute', 'ducks.image')
    .first();

  return { slot: slotDB, message: 'OK' };
};

const deleteDuck = async ({ user, slotId }: DeleteDuck) => {
  await db('slots').where({ id: slotId }).delete();
  return {
    slotId,
    isDeleted: true,
  };
};

export default {
  listSlots,
  crossingDucks,
  deleteDuck,
};
