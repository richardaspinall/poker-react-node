import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PokerTable } from '../components/PokerTable/PokerTable';
import { AppDispatch } from '../store/store';
import { fetchUserProfile } from './thunks/fetchUserProfile';

export function Play() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile({})); // getTable state from server
  }, []);

  return (
    <section className="play-page">
      <div className="play-header">
        <p className="eyebrow">Game Room</p>
        <h1>Play</h1>
      </div>
      <PokerTable />
    </section>
  );
}
