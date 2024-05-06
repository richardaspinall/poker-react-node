import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import holeCardsReducer from './holeCardsSlice';
import seatsReducer from './seatsSlice';
import usernameReducer from './usernameSlice';

const store = configureStore({
  reducer: {
    seats: seatsReducer,
    holeCards: holeCardsReducer,
    username: usernameReducer,
  },
});

// Type for the store's state
export type RootState = ReturnType<typeof store.getState>;

// Type for the store's dispatch function
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
