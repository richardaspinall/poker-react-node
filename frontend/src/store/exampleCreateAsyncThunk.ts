import { createAsyncThunk } from '@reduxjs/toolkit';
import FetchFasade from '../fetch/FetchFasade';

import { PlayerSitPayload, PlayerSitOutput } from '../../../backend/src/shared/api/types/PlayerSit';

const addPlayerToTable = createAsyncThunk(
  'table/addPlayerToTable',
  // if you type your function argument here
  async (payload: any, thunkApi) => {
    try {
      const response = await FetchFasade.post<PlayerSitPayload, PlayerSitOutput>('/api/actions/tables.join', payload);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default addPlayerToTable;
