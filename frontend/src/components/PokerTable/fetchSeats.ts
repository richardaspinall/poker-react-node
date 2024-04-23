import { createAsyncThunk } from '@reduxjs/toolkit';

import { PokerTableGetSeatsPayload } from '../../../../backend/src/shared/api/poker-tables/types/PokerTableGetSeats';
import apiCall from '../../fetch/apiCall';

const fetchSeats = createAsyncThunk(
  'pokerTables/getState',
  // if you type your function argument here
  async (payload: PokerTableGetSeatsPayload, thunkApi) => {
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
