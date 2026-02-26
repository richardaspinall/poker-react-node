import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectActingSeat,
  selectCommunityCards,
  selectHoleCards,
  selectMyUsername,
  selectPlayersCurrentBets,
  selectPot,
  selectSeats,
} from '../../store/selectors.ts';
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
  const playersCurrentBets = useSelector(selectPlayersCurrentBets);
  const pot = useSelector(selectPot);
  const communityCards = useSelector(selectCommunityCards);

  const seatsByNumber = new Map((seats.value ?? []).map((seat) => [seat.seatNumber, seat]));
  const baseDisplayedSeats = Array.from({ length: 9 }, (_, index) => {
    const seatNumber = index + 1;
    return {
      seatNumber,
      username: seatsByNumber.get(seatNumber)?.username,
    };
  });
  const mySeatNumber = baseDisplayedSeats.find((seat) => seat.username === myUsername)?.seatNumber;
  const focalSeatNumber = mySeatNumber ?? 5;
  const displayedSeats = baseDisplayedSeats.map((seat) => ({
    ...seat,
    viewSlot: (seat.seatNumber - focalSeatNumber + 9) % 9,
  }));

  const actingSeatUsername = displayedSeats.find((seat) => seat.seatNumber === actingSeat)?.username;
  const isMyTurn = Boolean(actingSeatUsername && actingSeatUsername === myUsername);
  const myStack = playersCurrentBets?.find((player) => player.seatNumber === mySeatNumber)?.chipCount;

  return (
    <section className="poker-table-shell">
      <div className="poker-table-info">
        <p className="eyebrow">Table 1</p>
        <h2>Live Hand</h2>
        <p className="table-status">{isMyTurn ? 'Your turn to act' : 'Waiting for the active player'}</p>
      </div>
      <div id="poker-table">
        <Pot pot={pot} />
        <Board communityCards={communityCards} />
        {displayedSeats.map((seat) => (
          <Seat
            key={seat.seatNumber}
            seatNumber={seat.seatNumber}
            viewSlot={seat.viewSlot}
            myUsername={myUsername}
            seatUsername={seat.username}
            cards={holeCards.value}
            isActingSeat={seat.seatNumber === actingSeat}
            playersCurrentBets={playersCurrentBets}
          />
        ))}
      </div>
      <Actions isMyTurn={isMyTurn} currentStack={myStack} />
    </section>
  );
}
