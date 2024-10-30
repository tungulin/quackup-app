import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { sessionSlice } from './public/session';
import { duckSlotsSlice } from './public/slots';
import { loadingSlice } from 'modules/Loading';
import { headerSlice } from 'modules/Header';
import { coinShopSlice } from 'modules/CoinShop/store';
import { duckShopSlice } from 'modules/DuckShop/store';

export const store = configureStore({
  reducer: {
    [sessionSlice.name]: sessionSlice.reducer,
    [duckSlotsSlice.name]: duckSlotsSlice.reducer,
    [loadingSlice.name]: loadingSlice.reducer,
    [headerSlice.name]: headerSlice.reducer,
    [coinShopSlice.name]: coinShopSlice.reducer,
    [duckShopSlice.name]: duckShopSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
