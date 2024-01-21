import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import addPlayerToTable from './exampleCreateAsyncThunk.ts';
import { PlayerSitOutput } from '../../../backend/src/shared/api/types/PlayerSit.ts';

interface SeatSlice {
  seat: string;
  player: string;
}

interface TableSlice {
  seats: SeatSlice[];
  loading: boolean;
  error: SerializedError | null;
}

// this is our state for the table
// a slice of the state pie
const initialState: TableSlice = {
  seats: [
    {
      seat: 'seat-1',
      player: 'player-1',
    },
    { seat: 'seat-2', player: 'player-2' },
  ],
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
// would probably use the extraReducers for refreshing the table state or something on load
export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<TableSlice>) => {
      return action.payload;
    },
    addSeat: (state, action: PayloadAction<SeatSlice>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPlayerToTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPlayerToTable.fulfilled, (state, action: PayloadAction<PlayerSitOutput>) => {
        state.loading = false;
        const { seat, newPlayer } = action.payload;
        const seatIndex = state.seats.findIndex((s) => s.seat === seat);
        if (seatIndex !== -1) {
          state.seats[seatIndex].player = newPlayer;
        }
      })
      .addCase(addPlayerToTable.rejected, (state, action) => {
        state.loading = false;
        // Assigning the error message to the state
        state.error = action.error;
      });
  },
});

// export the actions to
export const { setTable, addSeat } = tableSlice.actions;

export default tableSlice.reducer;
