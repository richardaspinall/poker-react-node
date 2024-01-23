import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import fetchPokerTableState from './fetchPokerTableState.ts';
import { PokerTableState } from '../../../backend/src/shared/api/types/TableState.ts';

interface PokerTableSlice {
  value: PokerTableState;
  loading: boolean;
  error: SerializedError | null;
}

// this is our state for the table
// a slice of the state pie
const initialState: PokerTableSlice = {
  value: {
    tableName: '',
  },
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const pokerTableSlice = createSlice({
  name: 'pokerTable',
  initialState,
  reducers: {
    setTable: (state, action: PayloadAction<PokerTableSlice>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokerTableState.pending, (pokerTableSlice) => {
        pokerTableSlice.loading = true;
      })
      .addCase(fetchPokerTableState.fulfilled, (pokerTableSlice, action: PayloadAction<PokerTableState>) => {
        pokerTableSlice.loading = false;
        pokerTableSlice.value = action.payload;
      })
      .addCase(fetchPokerTableState.rejected, (pokerTableSlice, action) => {
        pokerTableSlice.loading = false;
        // Assigning the error message to the state
        pokerTableSlice.error = action.error;
      });
  },
});

// export the actions to
export const { setTable } = pokerTableSlice.actions;

export default pokerTableSlice.reducer;
