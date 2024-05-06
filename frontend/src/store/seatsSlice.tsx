import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import {
  PlayerJoinedEvent,
  PlayerLeftEvent,
} from '../../../backend/src/shared/websockets/poker-tables/types/PokerTableEvents';
import fetchSeats from '../components/PokerTable/fetchSeats';

type Seat = {
  seatNumber: number;
  username?: string;
};

interface SeatsSlice {
  value: Seat[];
  loading: boolean;
  error: SerializedError | null;
}

// this is our state for the seats
// a slice of the state pie
const initialState: SeatsSlice = {
  value: [
    {
      seatNumber: 1,
    },
    {
      seatNumber: 2,
    },
  ],
  loading: false,
  error: null,
};

function updateSeats(seats: Seat[], seatNumber: number, username: string | undefined = undefined) {
  const seatIndex = seats.findIndex((seat) => seat.seatNumber === seatNumber);

  if (seatIndex !== -1) {
    seats[seatIndex].username = username;
  }

  return seats;
}
// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setSeats: (state, action: PayloadAction<SeatsSlice>) => {
      state = action.payload;
    },
    addUser: (state, action: PayloadAction<PlayerJoinedEvent>) => {
      const { username, seatNumber } = action.payload;
      state.value = updateSeats(state.value, seatNumber, username);
    },
    removeUser: (state, action: PayloadAction<PlayerLeftEvent>) => {
      const { seatNumber } = action.payload;
      state.value = updateSeats(state.value, seatNumber);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeats.pending, (seatsSlice) => {
        seatsSlice.loading = true;
      })
      .addCase(fetchSeats.fulfilled, (seatsSlice, action) => {
        seatsSlice.loading = false;
        seatsSlice.value = action.payload;
      })
      .addCase(fetchSeats.rejected, (seatsSlice, action) => {
        seatsSlice.loading = false;
        // Assigning the error message to the state
        seatsSlice.error = action.error;
      });
  },
});

export const { setSeats, addUser, removeUser } = seatsSlice.actions;

export default seatsSlice.reducer;
