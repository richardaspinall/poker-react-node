import { useDispatch, useSelector } from 'react-redux';

import './Table.css';
import { socket } from '../../Socket';

import Pot from './Pot/Pot';
import Board from './Board/Board';
import Seat from './Seat/Seat';
import Actions from './Actions/Actions';

import { AppDispatch } from '../../store/store.tsx';

import { useEffect } from 'react';

import fetchPokerTableState from '../../store/fetchPokerTableState.ts';
import { selectPokerTable } from '../../store/selectors.ts';

type TableProps = {};
export function Table({}: TableProps) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokerTableState({ tableName: 'table-1' })); // getTable state from server
  }, []);

  const pokerTableState = useSelector(selectPokerTable);
  return (
    <>
      <div id="table">
        <Pot />
        <Board />

        {pokerTableState.value.seats?.map((seat) => (
          <Seat key={seat.seatName} seatNumber={seat.seatName} stack={seat.player.stack} socket={socket} />
        ))}
      </div>
      <Actions />
    </>
  );
}
