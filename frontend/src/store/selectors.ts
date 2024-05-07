import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

export const selectSeats = createSelector(
  (state: RootState) => state.seats, // This is the input selector
  (seats) => {
    return { ...seats };
  }
);

export const selectUsername = createSelector(
  (state: RootState) => state.userProfile, // This is the input selector
  (userProfile) => {
    return userProfile.value;
  }
);

export const selectHoleCards = createSelector(
  (state: RootState) => state.holeCards, // This is the input selector
  (holeCards) => {
    return { ...holeCards };
  }
);
