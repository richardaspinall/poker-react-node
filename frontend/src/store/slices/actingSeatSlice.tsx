import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import { SeatToActEvent } from '../../../../backend/src/shared/websockets/game/types/GameEvents';

interface ActingSeatSlice {
  value: number | null;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: ActingSeatSlice = {
  value: null,
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const actingSeatSlice = createSlice({
  name: 'acting-seat',
  initialState,
  reducers: {
    setActingSeat: (state, action: PayloadAction<SeatToActEvent>) => {
      state.value = action.payload.seatToAct;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchActingSeat.pending, (actingSeatSlice) => {
  //         actingSeatSlice.loading = true;
  //       })
  //       .addCase(fetchActingSeat.fulfilled, (actingSeatSlice, action) => {
  //         actingSeatSlice.loading = false;
  //         actingSeatSlice.value = action.payload;
  //       })
  //       .addCase(fetchActingSeat.rejected, (actingSeatSlice, action) => {
  //         actingSeatSlice.loading = false;
  //         actingSeatSlice.error = action.error;
  //       });
  //   },
});

export const { setActingSeat } = actingSeatSlice.actions;

export default actingSeatSlice.reducer;
