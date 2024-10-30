import db from 'libs/db';

export const isExistValueInDB = async (table: string, query: any) => {
  let isValid = true;
  const value = await db(table).where(query).first();
  if (!value) isValid = false;

  return isValid;
};

export const isNotExistValueInDB = async (table: string, query: any) => {
  let isValid = true;
  const value = await db(table).where(query).first();
  if (value) isValid = false;

  return isValid;
};


export {};
