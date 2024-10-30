import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getDuckShopListThunk } from './thunk';

const initialState: any = {
  duckShopList: [],
};

export const duckShopSlice = createSlice({
  name: 'duckShop',
  initialState,
  reducers: {
    reset: (state) => {
      state.duckShopList = [];
    },
    updateDuckShopList: (state, action: PayloadAction<any[]>) => {
      state.duckShopList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDuckShopListThunk.fulfilled, (state, action: PayloadAction<[]>) => {
      state.duckShopList = action.payload;
    });
  },
});

export const { reset, updateDuckShopList } = duckShopSlice.actions;
