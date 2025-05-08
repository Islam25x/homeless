import { configureStore } from '@reduxjs/toolkit';
import { PropertySlice } from './PropertySlice/apiSlice';
import { authApi } from './Auth/AuthApi';
import { AdminApi } from './Admin/AdminApi';
import { SearchApi } from './Search/SearchApi';
import { SaveApi } from './SaveSlice/SaveApi';
import { ChatApi } from './ChatApi/ChatApi';
import { CommentSlice } from './CommentApi/CommentApi';
import { PropertyRequestApi } from './RentalRequestApi/RentalRequestApi';

export const store = configureStore({
  reducer: {
    [PropertySlice.reducerPath]: PropertySlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [AdminApi.reducerPath]: AdminApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
    [SaveApi.reducerPath]: SaveApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [CommentSlice.reducerPath]: CommentSlice.reducer,
    [PropertyRequestApi.reducerPath]: PropertyRequestApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PropertySlice.middleware, authApi.middleware, AdminApi.middleware , SearchApi.middleware , SaveApi.middleware , ChatApi.middleware , CommentSlice.middleware , PropertyRequestApi.middleware),
});
