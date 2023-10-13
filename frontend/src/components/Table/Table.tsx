import { useCallback, useState } from 'react';
import { socket } from '../../Socket';
import FetchFasade from '../../fetch/FetchFasade';
import './Table.css';

export function Table() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [seatNumber, setSeatNumber] = useState('1');

  const playerReady = useCallback(async () => {
    const payload = { table: 'table-1', socketId: socket.id };
    const result = await FetchFasade.post('/api/playerReady', payload);
    if (result.ok) {
      console.log(result.getPayload());
    } else {
      console.log('error', result.errorMessage);
    }
  }, []);

  const playerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await FetchFasade.post('/api/playerSit', payload);

    if (result.ok) {
      // console.log(result.getPayload());
    } else {
      console.log('error', result.errorMessage);
    }

    setSeatNumber(event.currentTarget.id);
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

        <div className="seat" id="seat-1" data-chip-count="0" onClick={playerSit}>
          Empty
          <div id="dealer-indicator">B</div>
        </div>
        <div className="seat" id="seat-2" data-chip-count="0" onClick={playerSit}>
          Empty
        </div>
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
