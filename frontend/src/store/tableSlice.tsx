import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

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
});

// export the actions to
export const { setTable, addSeat } = tableSlice.actions;

export default tableSlice.reducer;
