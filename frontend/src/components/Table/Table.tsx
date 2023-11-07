import './Table.css';
import { socket } from '../../Socket';

import Pot from './Pot/Pot';
import Board from './Board/Board';
import Seat from './Seat/Seat';
import Actions from './Actions/Actions';
import useSession from '../../useSession';

type TableProps = {};
export function Table({}: TableProps) {
  const { userId } = useSession();
  return (
    <>
      <div id="table">
        <Pot />
        <Board />
        <Seat seatNumber="seat-1" chipCount={1000} socket={socket} userId={userId} />
        <Seat seatNumber="seat-2" chipCount={1000} socket={socket} />
      </div>
      <Actions />
    </>
  );
}
