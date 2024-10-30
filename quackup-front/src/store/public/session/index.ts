import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Session, User } from './types';
import { initializeUserThunk } from './thunk';

const initialState: Session = {
  user: {
    id: undefined,
    telegramId: undefined,
    isBot: false,
    firstName: undefined,
    coinBalance: 0,
    coinDuckBalance: 0,
    languageCode: undefined,
    isPremium: false,
    photoUrl: undefined,
    isNew: false,
    profitCoinPerMinute: 0,
    offlineReward: 0,
  },
  isAuth: false,
  isClaimModalOpen: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    incrementBalance: (state) => {
      state.user.coinBalance += 1;
    },
    addBalance: (state, action: PayloadAction<number>) => {
      state.user.coinBalance += action.payload;
    },
    deductBalance: (state, action: PayloadAction<number>) => {
      state.user.coinBalance -= action.payload;
    },
    updateProfitCoin: (state, action: PayloadAction<number>) => {
      state.user.profitCoinPerMinute += action.payload;
    },
    resetBalance: (state) => {
      state.user.coinBalance = 0;
    },
    toggleClaimModal: (state, action: PayloadAction<boolean>) => {
      state.isClaimModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuth = true;

      if (action.payload.offlineReward > 0) {
        state.isClaimModalOpen = true;
      }
    });
  },
});

export const {
  incrementBalance,
  addBalance,
  updateProfitCoin,
  deductBalance,
  resetBalance,
  toggleClaimModal,
} = sessionSlice.actions;

export default sessionSlice.reducer;
