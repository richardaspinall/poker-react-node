import React, { useCallback } from 'react';
import FetchFasade from '../../../fetch/FetchFasade';

type ActionsProps = {};

function Actions({}: ActionsProps) {
  // This should be where we call FetchFasade generically based on the action
  const playerReady = useCallback(async () => {
    const payload = { table: 'table-1', socketId: socket.id };
    const result = await FetchFasade.post('/api/playerReady', payload);

    if (result.ok) {
      console.log(result.getValue());
    } else {
      console.log('error', result.errorMessage);
    }
  }, []);

  return (
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
        <button className="action-buttons" id="im-ready-button" onClick={playerReady}>
          I'm ready
        </button>
      </div>
    </div>
  );
}

export default Actions;
