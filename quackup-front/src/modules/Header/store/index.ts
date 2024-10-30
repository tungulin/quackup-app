import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isMute: false,
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setMute: (state, action: PayloadAction<boolean>) => {
      state.isMute = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setMute } = headerSlice.actions;
