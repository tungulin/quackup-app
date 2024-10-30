import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.on(message('successful_payment'), async (ctx) => {
  console.log('ctx', ctx);
  console.log('successful_payment');
});

export default bot;
