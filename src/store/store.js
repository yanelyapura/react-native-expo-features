import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import shopReducer from '../features/shop/shopSlice';
import { shopApi } from '../services/shopService';
import { authApi } from '../services/AuthService';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    auth:authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware,authApi.middleware),
})

setupListeners(store.dispatch);