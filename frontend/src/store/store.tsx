import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './tableSlice';

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

// Type for the store's state
export type RootState = ReturnType<typeof store.getState>;

// Type for the store's dispatch function
export type AppDispatch = typeof store.dispatch;

export default store;
