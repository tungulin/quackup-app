import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCoinShopListThunk } from './thunk';

const initialState = {
  coinShopList: [],
};

export const coinShopSlice = createSlice({
  name: 'coinShop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoinShopListThunk.fulfilled, (state, action: PayloadAction<[]>) => {
      state.coinShopList = action.payload;
    });
  },
});
