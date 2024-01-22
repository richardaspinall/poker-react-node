import { createAsyncThunk } from '@reduxjs/toolkit';
import FetchFasade from '../fetch/FetchFasade';
import { PokerTableGetStatePayload, PokerTableGetStateOutput } from '../../../backend/src/shared/api/types/TableState';

const fetchPokerTableState = createAsyncThunk(
  'pokerTables/getState',
  // if you type your function argument here
  async (payload: PokerTableGetStatePayload, thunkApi) => {
    try {
      const result = await FetchFasade.post<PokerTableGetStatePayload, PokerTableGetStateOutput>(
        '/pokerTables.getState',
        payload
      );

      if (result.ok) {
        console.log(result.getValue().state);
      } else {
        console.log('error', result.errorMessage);
      }
      return result.getValue().state;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default fetchPokerTableState;
