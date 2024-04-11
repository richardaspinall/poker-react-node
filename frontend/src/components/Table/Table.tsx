import { useEffect } from 'react';

import { useSocket } from '../../hooks/useSocket';
import Actions from './Actions/Actions';
import Board from './Board/Board';
import Pot from './Pot/Pot';
import Seat from './Seat/Seat';
import './Table.css';
import { useSubscribeToGameEvents } from './hooks/useSubscribeToGameEvents';

type TableProps = {};
export function Table({}: TableProps) {
  useSubscribeToGameEvents(); // Subscribe to socket events like player joined and player left

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
