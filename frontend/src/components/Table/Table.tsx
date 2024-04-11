import { useEffect } from 'react';

import { useSocket } from '../../hooks/useSocket';
import Actions from './Actions/Actions';
import Board from './Board/Board';
import Pot from './Pot/Pot';
import Seat from './Seat/Seat';
import './Table.css';

type TableProps = {};
export function Table({}: TableProps) {
  const { subscribeToEvent } = useSocket();
  // TODO: push down to appropriate component
  useEffect(() => {
    const subscribeToPlayerJoined = subscribeToEvent('player_joined', () => {
      console.log('Player sat down');
    });

    const subscribeToPlayerLeave = subscribeToEvent('player_left', () => {
      console.log('Player left the table');
    });

    return () => {
      subscribeToPlayerJoined();
      subscribeToPlayerLeave();
    };
  }, [subscribeToEvent]);

  return (
    <>
      <div id="table">
        <Pot />
        <Board />
        <Seat seatNumber="seat-1" chipCount={1000} />
        <Seat seatNumber="seat-2" chipCount={1000} />
      </div>
      <Actions />
    </>
  );
}
