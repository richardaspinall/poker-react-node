import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PokerTable } from '../components/PokerTable/PokerTable';
import { fetchUserProfile } from './thunks/fetchUserProfile';

export function Play() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserProfile({})); // getTable state from server
  }, []);

  return (
    <>
      <div>Play</div> <PokerTable />
    </>
  );
}
