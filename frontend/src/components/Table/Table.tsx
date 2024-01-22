import { useDispatch, useSelector } from 'react-redux';

import './Table.css';
import { socket } from '../../Socket';

import Pot from './Pot/Pot';
import Board from './Board/Board';
import Seat from './Seat/Seat';
import Actions from './Actions/Actions';

import { RootState, AppDispatch } from '../../store/store.tsx';

import { useEffect } from 'react';

import fetchPokerTableState from '../../store/fetchPokerTableState.ts';

type TableProps = {};
export function Table({}: TableProps) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokerTableState({ tableName: 'table-1' })); // getTable state from server
  }, [dispatch]);

  const table = useSelector((state: RootState) => state.table);

  console.log(table);
  return (
    <>
      <div id="table">
        <Pot />
        <Board />
        <Seat seatNumber="seat-1" chipCount={1000} socket={socket} />
        <Seat seatNumber="seat-2" chipCount={1000} socket={socket} />
      </div>
      <Actions />
    </>
  );
}
