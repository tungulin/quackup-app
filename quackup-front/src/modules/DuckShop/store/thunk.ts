import { createAsyncThunk } from '@reduxjs/toolkit';
import { buyDuck, getDuckShopList } from 'api/duck-shop';

export const getDuckShopListThunk = createAsyncThunk('duckShop/list', async (_, thunkApi) => {
  try {
    const response = await getDuckShopList();
    return response as any;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const buyDuckThunk = createAsyncThunk('duckShop/buy', async (data: any, thunkApi) => {
  try {
    const response = await buyDuck(data);
    return response as any;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});
