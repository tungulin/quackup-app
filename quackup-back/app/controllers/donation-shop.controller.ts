import { UserToken } from 'types/global';
import db from 'libs/db';

import { User } from '@telegram-apps/init-data-node';

const listDonationShop = async () => {
  return db('shop').orderBy('price', 'asc')
};

export default {
  listDonationShop,
};
