import { createAsyncThunk } from '@reduxjs/toolkit';

import { GamesGetGameStatePayload } from '../../../../../backend/src/shared/api/gen/games/types/GamesGetGameState';
import apiCall from '../../../fetch/apiCall';

const fetchGameState = createAsyncThunk(
  'games/getGameState',
  // if you type your function argument here
  async (payload: GamesGetGameStatePayload, thunkApi) => {
    try {
      const result = await apiCall.post('games.getGameState', payload);

      if (result.ok) {
        console.log(result);
      } else {
        console.log('error', result.error?.errorCode);
        throw result.error;
      }

      return result.payload;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export default fetchGameState;
