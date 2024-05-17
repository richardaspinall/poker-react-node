import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import { GameState } from '../../../../backend/src/shared/game/types/GameState.ts';
import { SeatToActEvent } from '../../../../backend/src/shared/websockets/game/types/GameEvents.ts';
import fetchGameState from '../../components/PokerTable/thunks/fetchGameState';

interface GameStateSlice {
  value: GameState | null;
  loading: boolean;
  error: SerializedError | null;
}
const initialState: GameStateSlice = {
  value: null,
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const gameStateSlice = createSlice({
  name: 'acting-seat',
  initialState,
  reducers: {
    setActingSeat: (state, action: PayloadAction<SeatToActEvent>) => {
      if (state.value === null) {
        console.log('GameState is null, cannot set acting seat.');
        // TODO: Maybe dispatch another action to handle the error?
        return;
      }
      state.value.seatToAct = action.payload.seatToAct;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameState.pending, (gameStateSlice) => {
        gameStateSlice.loading = true;
      })
      .addCase(fetchGameState.fulfilled, (gameStateSlice, action) => {
        gameStateSlice.loading = false;
        gameStateSlice.value = action.payload;
      })
      .addCase(fetchGameState.rejected, (gameStateSlice, action) => {
        gameStateSlice.loading = false;
        gameStateSlice.error = action.error;
      });
  },
});

export const { setActingSeat } = gameStateSlice.actions;

export default gameStateSlice.reducer;
