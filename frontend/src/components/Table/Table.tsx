import { useDispatch, useSelector } from 'react-redux';

import './Table.css';
import { socket } from '../../Socket';

import Pot from './Pot/Pot';
import Board from './Board/Board';
import Seat from './Seat/Seat';
import Actions from './Actions/Actions';

import { RootState } from '../../store/store.tsx';

import { setTable } from '../../store/tableSlice.tsx';

import { useEffect } from 'react';

type TableProps = {};
export function Table({}: TableProps) {
  const dispatch = useDispatch();
  const table = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(
      setTable({
        seats: [
          {
            seat: 'seat-1',
            player: 'player-1',
          },
          { seat: 'seat-2', player: 'player-3' },
        ],
        loading: false,
        error: null,
      })
    );
  }, [dispatch]);
  console.log(table.table);
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
