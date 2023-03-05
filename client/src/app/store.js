import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

// 📦 Custom Imports
import { themeReducer as theme } from '../features/theme/themeSlice.js';
import { authReducer as auth } from '../features/auth/authSlice.js';
import { snippetReducer as snippet } from '../features/snippet/snippetSlice.js';

// 📦 Create store
export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage,
      whitelist: ['theme', 'auth'],
    },
    combineReducers({
      theme,
      auth,
      snippet
    }),
  ),
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// 📦 Create persist store
export const storePersist = persistStore(store);
