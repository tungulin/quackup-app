import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  isClickOnLoadingButton: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setClickOnLoadingButton: (state, action: PayloadAction<boolean>) => {
      state.isClickOnLoadingButton = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoading, setClickOnLoadingButton } = loadingSlice.actions;
