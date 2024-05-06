import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';

interface UsernameSlice {
  value: string;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: UsernameSlice = {
  value: '',
  loading: false,
  error: null,
};

// https://redux-toolkit.js.org/api/createslice
// safe to muttate state in createSlice as it uses immer under the hood
//
// the reducers are the actions that can be dispatched to change the state
export const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;

export default usernameSlice.reducer;
