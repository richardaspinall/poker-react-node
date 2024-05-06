import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectHoleCards, selectSeats } from '../../store/selectors.ts';
import { AppDispatch } from '../../store/store.tsx';
import Actions from './Actions/Actions';
import Board from './Board/Board';
import './PokerTable.css';
import Pot from './Pot/Pot';
import Seat from './Seat/Seat';
import fetchSeats from './fetchSeats.ts';
import { useSubscribeToGameEvents } from './hooks/useSubscribeToGameEvents.ts';

type PokerTableProps = {};
export function PokerTable({}: PokerTableProps) {
  const dispatch: AppDispatch = useDispatch();

  useSubscribeToGameEvents(); // Subscribe to socket events like player joined and player left

  useEffect(() => {
    dispatch(fetchSeats({ pokerTableName: 'table_1' })); // getTable state from server
  }, []);

  const seats = useSelector(selectSeats);
  const holeCards = useSelector(selectHoleCards);

  return (
    <>
      <div id="poker-table">
        <Pot />
        <Board />
        {seats.value?.map((seat) => (
          <Seat
            key={seat.seatNumber}
            seatNumber={seat.seatNumber}
            userName={seat.username}
            chipCount={1000}
            cards={holeCards.value}
          />
        ))}
      </div>
      <Actions />
    </>
  );
}
