export type User = {
  id: number | undefined;
  telegramId: number | undefined;
  isBot: boolean;
  firstName: string | undefined;
  lastName?: string;
  username?: string;
  coinBalance: number;
  coinDuckBalance: number | undefined;
  languageCode?: string;
  isPremium: boolean;
  photoUrl: string | undefined;
  isNew: boolean;
  profitCoinPerMinute: number;
  offlineReward: number;
};

export type Session = {
  user: User;
  isAuth: boolean;
  isClaimModalOpen: boolean;
};
