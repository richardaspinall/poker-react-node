import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import { Card } from '../../../backend/src/shared/game/types/Deck';
import { DealCardsEvent } from '../../../backend/src/shared/websockets/game/types/GameEvents';

interface HoleCardsSlice {
  value: Card[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: HoleCardsSlice = {
  value: [],
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const holeCardsSlice = createSlice({
  name: 'hole-cards',
  initialState,
  reducers: {
    setHoleCards: (state, action: PayloadAction<DealCardsEvent>) => {
      state.value = action.payload.cards;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchCards.pending, (holeCardsSlice) => {
  //         holeCardsSlice.loading = true;
  //       })
  //       .addCase(fetchCards.fulfilled, (holeCardsSlice, action) => {
  //         holeCardsSlice.loading = false;
  //         holeCardsSlice.value = action.payload;
  //       })
  //       .addCase(fetchCards.rejected, (holeCardsSlice, action) => {
  //         holeCardsSlice.loading = false;
  //         // Assigning the error message to the state
  //         holeCardsSlice.error = action.error;
  //       });
  //   },
});

export const { setHoleCards } = holeCardsSlice.actions;

export default holeCardsSlice.reducer;
