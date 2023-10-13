import { useCallback, useState } from 'react';
import { socket } from '../../Socket';
import FetchFasade from '../../fetch/FetchFasade';
import './Table.css';

import Seat from './Seat';

export function Table() {
  // const [value, setValue] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  const playerReady = useCallback(async () => {
    const payload = { table: 'table-1', socketId: socket.id };
    const result = await FetchFasade.post('/api/playerReady', payload);
    if (result.ok) {
      console.log(result.getPayload());
    } else {
      console.log('error', result.errorMessage);
    }
  }, []);

  return (
    <>
      <div id="table">
        <div id="pot" data-chip-count="0">
          Pot
        </div>

        <div id="board-area">
          <div id="flop-area"></div>
          <div className="vl"></div>
          <div id="turn-area"></div>
          <div className="vl"></div>
          <div id="river-area"></div>
        </div>

        <Seat seatNumber="seat-1" socket={socket} />
        <Seat seatNumber="seat-2" socket={socket} />
      </div>
      <div id="player-actions">
        <div className="slidecontainer">
          <input type="range" min="0" max="10000" value="1000" className="slider" id="myRange"></input>
          <input id="bet-input" value="1000"></input>
        </div>
        <div>
          <button className="action-buttons" id="fold-action-button">
            Fold
          </button>
          <button className="action-buttons" id="check-action-button">
            Check
          </button>
          <button className="action-buttons" id="call-action-button">
            Call
          </button>
          <button className="action-buttons" id="raise-action-button">
            Bet
          </button>
          <button className="action-buttons" id="leave-table-button">
            Leave
          </button>
        </div>

        <button onClick={playerReady}>I'm ready</button>
      </div>
    </>
  );
}
