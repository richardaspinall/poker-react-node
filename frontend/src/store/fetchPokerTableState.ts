import { createAsyncThunk } from '@reduxjs/toolkit';
import { PokerTableGetStatePayload } from '../../../backend/src/shared/api/types/TableState';

import apiCall from '../fetch/apiCall';

const fetchPokerTableState = createAsyncThunk(
  'pokerTables/getState',
  // if you type your function argument here
  async (payload: PokerTableGetStatePayload, thunkApi) => {
    try {
      const result = await apiCall.post('/pokerTables.getState', payload);
      if (result?.ok) {
        console.log(result.state);
      } else {
        console.log('error', result?.error);
      }
      return result?.state;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default fetchPokerTableState;
