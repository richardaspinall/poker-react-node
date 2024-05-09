import { createAsyncThunk } from '@reduxjs/toolkit';

import { UsersGetProfilePayload } from '../../../../backend/src/shared/api/gen/users/types/UsersGetProfile';
import apiCall from '../../fetch/apiCall';

const fetchUserProfile = createAsyncThunk(
  'users/getProfile',
  // if you type your function argument here
  async (payload: UsersGetProfilePayload, thunkApi) => {
    try {
      const result = await apiCall.post('users.getProfile', payload);
      if (result?.ok) {
        console.log(result);
      } else {
        console.log('error', result?.error);
      }

      return result.profile;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export { fetchUserProfile };
