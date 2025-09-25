import { configureStore, ThunkDispatch, combineReducers } from '@reduxjs/toolkit';
import { authReducer, IAuthSliceType } from './slices/auth';
import { ICartSlice, cartReducer } from './slices/cart';
import { IOrderSlice, orderReducer } from './slices/orders';
import { IProductSlice, productReducer } from './slices/products';
import { useDispatch } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStore {
  authReducer: IAuthSliceType;
  cartReducer: ICartSlice;
  orderReducer: IOrderSlice;
  productReducer: IProductSlice;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
};

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
  orderReducer,
  productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
      },
    }),
});

export const persistor = persistStore(store);