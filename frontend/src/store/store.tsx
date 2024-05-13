import { useDispatch } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import actingSeatSlice from './slices/actingSeatSlice';
import holeCardsReducer from './slices/holeCardsSlice';
import seatsReducer from './slices/seatsSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    seats: seatsReducer,
    userProfile: userProfileReducer,
    holeCards: holeCardsReducer,
    seatToAct: actingSeatSlice,
  },
});

// Type for the store's state
export type RootState = ReturnType<typeof store.getState>;

// Type for the store's dispatch function
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
