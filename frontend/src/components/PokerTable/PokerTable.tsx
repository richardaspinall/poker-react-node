import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectActingSeat, selectHoleCards, selectMyUsername, selectSeats } from '../../store/selectors.ts';
import { AppDispatch } from '../../store/store.tsx';
import Actions from './Actions/Actions';
import Board from './Board/Board';
import './PokerTable.css';
import Pot from './Pot/Pot';
import Seat from './Seat/Seat';
import { useSubscribeToGameEvents } from './hooks/useSubscribeToGameEvents.ts';
import fetchGameState from './thunks/fetchGameState.ts';
import fetchSeats from './thunks/fetchSeats.ts';

export function PokerTable() {
  const dispatch: AppDispatch = useDispatch();

  useSubscribeToGameEvents(); // Subscribe to socket events like player joined and player left

  useEffect(() => {
    dispatch(fetchSeats({ pokerTableName: 'table_1' })); // getTable state from server
  }, []);

  useEffect(() => {
    dispatch(fetchGameState({ pokerTableName: 'table_1' })); // getGameState state from server
  }, []);

  const seats = useSelector(selectSeats);
  const holeCards = useSelector(selectHoleCards);
  const actingSeat = useSelector(selectActingSeat);
  const myUsername = useSelector(selectMyUsername);

  const isMyTurn = seats.value?.find((seat) => seat.seatNumber === actingSeat)?.username === myUsername;

  return (
    <>
      <div id="poker-table">
        <Pot />
        <Board />
        {seats.value?.map((seat) => (
          <Seat
            key={seat.seatNumber}
            seatNumber={seat.seatNumber}
            myUsername={myUsername}
            seatUsername={seat.username}
            chipCount={1000}
            cards={holeCards.value}
            isActingSeat={seat.seatNumber === actingSeat}
          />
        ))}
      </div>
      <Actions isMyTurn={isMyTurn} />
    </>
  );
}
