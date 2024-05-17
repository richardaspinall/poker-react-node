import { createAsyncThunk } from '@reduxjs/toolkit';

import { PokerTablesGetSeatsPayload } from '../../../../backend/src/shared/api/gen/poker-tables/types/PokerTablesGetSeats';
import apiCall from '../../fetch/apiCall';

const fetchSeats = createAsyncThunk(
  'pokerTables/getSeats',
  // if you type your function argument here
  async (payload: PokerTablesGetSeatsPayload, thunkApi) => {
    try {
      const result = await apiCall.post('poker-tables.getSeats', payload);
      if (result?.ok) {
        console.log(result);
      } else {
        console.log('error', result?.error);
      }

      return result.seats;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default fetchSeats;
