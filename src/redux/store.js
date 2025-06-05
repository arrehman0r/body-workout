import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import exerciseReducer from './slices/exerciseSlice';
import articleReducer from './slices/articleSlice';
import progressReducer from './slices/progressSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Only persist the progress slice, as exercises and articles are hardcoded
  // and don't need to be rehydrated from storage.
  // whitelist: ['progress'],
  blacklist: ["exercises"]
};

const rootReducer = combineReducers({
  exercises: exerciseReducer,
  articles: articleReducer,
  progress: progressReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);