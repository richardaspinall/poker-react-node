import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

export const selectSeats = createSelector(
  (state: RootState) => state.seats, // This is the input selector
  (seats) => {
    return { ...seats };
  }
);
