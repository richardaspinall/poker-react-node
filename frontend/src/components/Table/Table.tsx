import './Table.css';
import { socket } from '../../Socket';

import Pot from './Pot/Pot';
import Board from './Board/Board';
import Seat from './Seat/Seat';
import Actions from './Actions/Actions';

type TableProps = {};
export function Table({}: TableProps) {
  // const [value, setValue] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

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
