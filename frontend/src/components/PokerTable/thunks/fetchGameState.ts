import { createAsyncThunk } from '@reduxjs/toolkit';

import { GamesGetGameStatePayload } from '../../../../../backend/src/shared/api/gen/games/types/GamesGetGameState';
import apiCall from '../../../fetch/apiCall';

const fetchGameState = createAsyncThunk(
  'pokerTables/getState',
  // if you type your function argument here
  async (payload: GamesGetGameStatePayload, thunkApi) => {
    try {
      const result = await apiCall.post('games.getGameState', payload);

      const { ok, ...gameState } = result; // TODO: maybe it's better to have the GamesGetGameStatePayload be {ok: boolean, payload: ...}
      if (ok) {
        console.log(result);
      } else {
        console.log('error', result?.error);
      }

      return gameState;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export default fetchGameState;
