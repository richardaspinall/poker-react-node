import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import { GameState } from '../../../../backend/src/shared/game/types/GameState.ts';
import {
  DealCardsEvent,
  PlayerBetEvent,
  SeatToActEvent,
  UpdatePotEvent,
} from '../../../../backend/src/shared/websockets/game/types/GameEvents.ts';
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
    setCommunityCards: (state, action: PayloadAction<DealCardsEvent>) => {
      if (state.value === null) {
        return;
      }
      state.value.communityCards = action.payload.cards;
    },
    setPot: (state, action: PayloadAction<UpdatePotEvent>) => {
      if (state.value === null) {
        return;
      }
      state.value.pot = action.payload.pot;
    },
    setPlayerBet: (state, action: PayloadAction<PlayerBetEvent>) => {
      if (state.value === null) {
        return;
      }

      state.value.playersCurrentBets = state.value.playersCurrentBets.map(
        (player: { currentBet: number; seatNumber: number }) =>
          player.seatNumber === action.payload.seatNumber
            ? { ...player, currentBet: action.payload.betAmount, chipCount: action.payload.chipCount }
            : player,
      );
    },
    resetBets: (state) => {
      if (state.value === null) {
        return;
      }

      state.value.playersCurrentBets = state.value.playersCurrentBets.map(
        (player: { currentBet: number; seatNumber: number }) => ({ ...player, currentBet: 0 }),
      );
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
        gameStateSlice.error = action.payload || { message: action.error.message };
      });
  },
});

export const { setActingSeat, setCommunityCards, setPot, setPlayerBet, resetBets } = gameStateSlice.actions;

export default gameStateSlice.reducer;
