import { useSelector } from 'react-redux';

import { selectSeats } from '../../store/selectors.ts';
import Actions from './Actions/Actions.tsx';
import Board from './Board/Board.tsx';
import './PokerTable.css';
import Pot from './Pot/Pot.tsx';
import Seat from './Seat/Seat.tsx';
import { useSubscribeToGameEvents } from './hooks/useSubscribeToGameEvents.ts';

type PokerTableProps = {};
export function PokerTable({}: PokerTableProps) {
  useSubscribeToGameEvents(); // Subscribe to socket events like player joined and player left

  const seats = useSelector(selectSeats);
  return (
    <>
      <div id="pokertable">
        <Pot />
        <Board />
        {seats.value?.map((seat) => (
          <Seat key={seat.seatNumber} seatNumber={seat.seatNumber} userName={seat.player?.username} chipCount={1000} />
        ))}
      </div>
      <Actions />
    </>
  );
}
