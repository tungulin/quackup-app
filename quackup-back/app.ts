//todo: change this to global.d.ts
import { type InitDataParsed } from '@telegram-apps/init-data-node';

declare global {
  var ENV: string;
  var DB_HOST: string;
  var DB_USER: string;
  var DB_PASSWORD: string;
  var DB_DATABASE: string;
  var BOT_TOKEN: string;

  namespace Express {
    interface Request {
      initTelegramData: Required<InitDataParsed>;
    }
  }
}

import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';

global.ENV = process.env.NODE_ENV || 'development';
import 'dotenv/config';

import db from 'libs/db';
import cron from 'libs/cron';

import userRoutes from 'routes/user.route';
import coinShopRoutes from 'routes/coin-shop.route';
import duckShopRoutes from 'routes/duck-shop.route';
import duckSlotsRoutes from 'routes/duck-slots.route';
import { messages } from 'helpers/constants';
import bot from 'libs/telegram';

import nocache from 'nocache';

const app = express();
const isProduction = ENV === 'production';

app.use(bodyParser.json());
app.use(nocache());

bot.start((ctx) =>
  ctx.reply(messages.welcomeBot, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Website', url: 'https://quackup.app' },
          { text: 'TG chat', url: 'https://t.me/quackup_official' },
        ],
        // prettier-ignore
        [{ text: 'Play', web_app: { url: isProduction ? 'https://app.quackup.io' : 'https://app-stage.quackup.io' } }],
      ],
    },
  })
);
bot.launch();

//todo: check for production cors
app.use(cors());

app.use('/user', userRoutes);
app.use('/duck-slots', duckSlotsRoutes);
app.use('/duck-shop', duckShopRoutes);
app.use('/coin-shop', coinShopRoutes);

const start = async () => {
  console.log('ENV:', ENV);
  app.listen(process.env.PORT, () => console.info(`Server started on port ${process.env.PORT}`));
  await db.migrate.latest().then(() => console.log(`DB migrated: ${process.env.DB_DATABASE}`));

  cron.startRewardCounter();
};

start();
