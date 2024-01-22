import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
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
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
