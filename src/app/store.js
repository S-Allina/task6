import { configureStore } from '@reduxjs/toolkit';
import songsReducer from '../slices/songsSlice';
import { songsApi } from '../services/songsApi';

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    [songsApi.reducerPath]: songsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(songsApi.middleware),
});