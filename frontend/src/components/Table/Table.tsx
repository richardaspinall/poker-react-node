import './Table.css';

import Pot from './Pot/Pot';
import Board from './Board/Board';
import Seat from './Seat/Seat';
import Actions from './Actions/Actions';

type TableProps = {};
export function Table({}: TableProps) {
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
