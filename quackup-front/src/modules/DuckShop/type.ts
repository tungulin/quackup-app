export type DuckType = {
  id: number;
  image: string;
  level: number;
  profitPerMinute: string;
  price: number;
  isDonationPrice: boolean;
  isLock: boolean;
  isLockByTime: boolean;
  UTCLockTime: string | null;
};
