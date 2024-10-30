import { createAsyncThunk } from '@reduxjs/toolkit';
import { initializeUser, tapDuck } from 'api/user';

export const initializeUserThunk = createAsyncThunk('user/initialize', async (_, thunkApi) => {
  try {
    const response = await initializeUser();
    return response as any;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const tapDuckThunk = createAsyncThunk('user/tap', async (data: any, thunkApi) => {
  try {
    const response = await tapDuck(data);
    return response as any;
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});
