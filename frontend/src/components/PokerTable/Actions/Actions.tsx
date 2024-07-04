import { useCallback, useState } from 'react';

import apiCall from '../../../fetch/apiCall';
import ChipDisplay from '../../Chips/ChipDisplay';

type ActionsProps = {
  isMyTurn: boolean;
  bigBlind?: number;
};

const MAX_AMOUNT = 100000;

function Actions({ isMyTurn, bigBlind = 100 }: ActionsProps) {
  const [betAmount, setBetAmount] = useState(bigBlind);
  const [showChipDisplay, setShowChipDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [allIn, setAllIn] = useState(false);

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
    if (betAmount < bigBlind) {
      // Do something with the error
      setErrorMessage(`Minimum bet amount is ${bigBlind}`);
      setBetAmount(bigBlind);
      return;
    } else if (betAmount > MAX_AMOUNT) {
      setErrorMessage(`Maximum bet amount is ${MAX_AMOUNT}`); // TODO: this will be all their chips
      setBetAmount(MAX_AMOUNT);
      return;
    }
    setErrorMessage('');

    setShowChipDisplay(true);

    const payload = { pokerTableName: 'table_1', amount: betAmount };

    const result = await apiCall.post('games.bet', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [betAmount]);

  const snapToNearest = (value: number, increment: number) => {
    return Math.round(value / increment) * increment;
  };

  const handleBetInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const snappedValue = snapToNearest(value, bigBlind);

    if (snappedValue === MAX_AMOUNT) {
      setAllIn(true);
    } else {
      setAllIn(false);
    }

    setBetAmount(snappedValue);
    setErrorMessage('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setBetAmount(value);

    if (value === MAX_AMOUNT) {
      setAllIn(true);
    } else {
      setAllIn(false);
    }
    setErrorMessage('');
  };

  return (
    <div id="player-actions">
      {isMyTurn && (
        <div>
          <div className="slidecontainer">
            <input
              type="range"
              min={bigBlind}
              max="1000"
              value={betAmount}
              className="slider"
              id="myRange"
              onChange={handleBetInputChange}
            ></input>
            <input id="bet-input" min={bigBlind} max="10000" value={betAmount} onChange={handleInputChange}></input>
          </div>
          {errorMessage && (
            <div className="error-message" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          )}
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
            {allIn ? 'All In' : 'Bet'}
          </button>
          {showChipDisplay && <ChipDisplay totalValue={betAmount} />}
        </div>
      )}
    </div>
  );
}

export default Actions;
