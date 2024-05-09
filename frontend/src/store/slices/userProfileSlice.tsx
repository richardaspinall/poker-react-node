import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

import { fetchUserProfile } from '../../pages/thunks/fetchUserProfile';

interface UserProfile {
  username: string;
}
interface UserProfileSlice {
  value?: UserProfile;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: UserProfileSlice = {
  value: undefined,
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const userProfileSlice = createSlice({
  name: 'userprofile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (userProfileSlice) => {
        userProfileSlice.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (userProfileSlice, action) => {
        userProfileSlice.loading = false;
        userProfileSlice.value = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (userProfileSlice, action) => {
        userProfileSlice.loading = false;
        // Assigning the error message to the state
        userProfileSlice.error = action.error;
      });
  },
});

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
