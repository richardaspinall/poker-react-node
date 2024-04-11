import { Table } from '../components/Table/Table';
import { useSubscribeToEvents } from './hooks/useSubscribeToEvents';

export function Play() {
  useSubscribeToEvents(); // Subscribe to socket events like player joined and player left

  return (
    <>
      <div>Play</div> <Table />
    </>
  );
}
