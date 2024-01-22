import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';

export const selectPokerTable = createSelector(
  (state: RootState) => state.pokerTable, // This is the input selector
  (pokerTable) => pokerTable
);
