import Actions from './Actions/Actions';
import Board from './Board/Board';
import './PokerTable.css';
import Pot from './Pot/Pot';
import Seat from './Seat/Seat';
import { useSubscribeToGameEvents } from './hooks/useSubscribeToGameEvents';

type PokerTableProps = {};
export function PokerTable({}: PokerTableProps) {
  useSubscribeToGameEvents(); // Subscribe to socket events like player joined and player left

  return (
    <>
      <div id="poker-table">
        <Pot />
        <Board />
        <Seat seatNumber="seat-1" chipCount={1000} />
        <Seat seatNumber="seat-2" chipCount={1000} />
      </div>
      <Actions />
    </>
  );
}
