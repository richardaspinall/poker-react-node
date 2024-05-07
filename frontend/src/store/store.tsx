import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import seatsReducer from './seatsSlice';
import holeCardsReducer from './slices/holeCardsSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    seats: seatsReducer,
    userProfile: userProfileReducer,
    holeCards: holeCardsReducer,
  },
});

// Type for the store's state
export type RootState = ReturnType<typeof store.getState>;

// Type for the store's dispatch function
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
