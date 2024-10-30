import { CronJob } from 'cron';
import reward from './reward';

const startRewardCounter = () => {
  CronJob.from({
    cronTime: '*/1 * * * *',
    onTick: () => reward.receiving(),
    start: true,
    runOnInit: true,
    timeZone: 'Europe/Moscow',
  });
};

export = {
  startRewardCounter,
};
