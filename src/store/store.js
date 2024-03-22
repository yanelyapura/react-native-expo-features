import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import shopReducer from '../features/shop/shopSlice';
import authReducer from '../features/auth/authSlice';
import { shopApi } from '../services/shopService';
import { authApi } from '../services/AuthService';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware),
})

setupListeners(store.dispatch);