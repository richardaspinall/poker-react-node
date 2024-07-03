import { useCallback, useState } from 'react';

import apiCall from '../../../fetch/apiCall';

type ActionsProps = {
  isMyTurn: boolean;
};

function Actions({ isMyTurn }: ActionsProps) {
  const [betAmount, setBetAmount] = useState(1000);

  const fold = useCallback(async () => {
    const payload = { pokerTableName: 'table_1' };
    const result = await apiCall.post('games.fold', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, []);

  const check = useCallback(async () => {
    const payload = { pokerTableName: 'table_1' };
    const result = await apiCall.post('games.check', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, []);

  const call = useCallback(async () => {
    const payload = { pokerTableName: 'table_1' };
    const result = await apiCall.post('games.call', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, []);

  const bet = useCallback(async () => {
    const payload = { pokerTableName: 'table_1', amount: betAmount };

    const result = await apiCall.post('games.bet', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [betAmount]);

  const handleBetInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(Number(event.target.value));
  };

  return (
    <div id="player-actions">
      {isMyTurn && (
        <div>
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="10000"
              value={betAmount}
              className="slider"
              id="myRange"
              onChange={handleBetInputChange}
            ></input>
            <input id="bet-input" value={betAmount} onChange={handleBetInputChange}></input>
          </div>
          <button className="action-buttons" id="fold-action-button" aria-label="Fold" onClick={fold}>
            Fold
          </button>
          <button className="action-buttons" id="check-action-button" aria-label="Check" onClick={check}>
            Check
          </button>
          <button className="action-buttons" id="call-action-button" aria-label="Call" onClick={call}>
            Call
          </button>
          <button className="action-buttons" id="raise-action-button" aria-label="Bet" onClick={bet}>
            Bet
          </button>
        </div>
      )}
    </div>
  );
}

export default Actions;
