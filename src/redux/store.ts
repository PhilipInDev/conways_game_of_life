import { autoBatchEnhancer, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { gameReducer } from './game-of-life.slice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { gameOfLifeApi } from '@/redux/game-of-life.api';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { GameState } from 'src/shared';
import { StateWithHistory } from 'redux-undo';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer<StateWithHistory<GameState>>(persistConfig, gameReducer)

export const store = configureStore({
  reducer: {
    game: persistedReducer,
    [gameOfLifeApi.reducerPath]: gameOfLifeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      gameOfLifeApi.middleware,
      createStateSyncMiddleware()
    ),
  enhancers: (existingEnhancers) => existingEnhancers
    .concat(
      autoBatchEnhancer(),
    ),
});

setupListeners(store.dispatch);
initMessageListener(store);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
