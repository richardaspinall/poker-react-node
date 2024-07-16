import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

export const selectSeats = createSelector(
  (state: RootState) => state.seats,
  (seats) => {
    return { ...seats };
  },
);

export const selectMyUsername = createSelector(
  (state: RootState) => state.userProfile,
  (userProfile) => {
    return userProfile.value?.username;
  },
);

export const selectHoleCards = createSelector(
  (state: RootState) => state.holeCards,
  (holeCards) => {
    return { ...holeCards };
  },
);

export const selectActingSeat = createSelector(
  (state: RootState) => state.gameStateSlice.value,
  (gameState) => {
    return gameState?.seatToAct;
  },
);

export const selectCommunityCards = createSelector(
  (state: RootState) => state.gameStateSlice.value,
  (gameState) => {
    return gameState?.communityCards;
  },
);
