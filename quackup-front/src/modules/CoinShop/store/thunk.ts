import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCoinShopList } from 'api/coin-shop';
import { initializeUser, tapDuck } from 'api/user';

export const getCoinShopListThunk = createAsyncThunk('coinShop/list', async (_, thunkApi) => {
  try {
    const response = await getCoinShopList();
    return response as any;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});
