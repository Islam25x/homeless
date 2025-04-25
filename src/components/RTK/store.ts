import { configureStore } from '@reduxjs/toolkit';
import { PropertySlice } from './PropertySlice/apiSlice';
import { authApi } from './Auth/AuthApi';

export const store = configureStore({
  reducer: {
    [PropertySlice.reducerPath]: PropertySlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PropertySlice.middleware, authApi.middleware),
});