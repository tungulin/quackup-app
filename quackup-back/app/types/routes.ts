// ======= User routes =======

export type SignInParams = {
  telegramId: number;
  isBot?: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: string;
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  photoUrl?: string;
};

// ======= Duck routes =======

export type TapParams = {
  count: number;
};

export type BuyParams = {
  id: number;
};
