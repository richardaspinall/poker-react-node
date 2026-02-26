import { useCallback, useEffect, useMemo, useState } from 'react';

import { APIMethodMap } from '../../../../../backend/src/shared/api/gen/APIMethodMap';
import apiCall from '../../../fetch/apiCall';

type ActionsProps = {
  isMyTurn: boolean;
  bigBlind?: number;
  currentStack?: number;
};

const FALLBACK_MAX_AMOUNT = 10000;
type ActionRoute = 'games.fold' | 'games.check' | 'games.call' | 'games.bet';

function Actions({ isMyTurn, bigBlind = 100, currentStack }: ActionsProps) {
  const [betAmount, setBetAmount] = useState(bigBlind);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const maxAmount = useMemo(() => {
    const stackCap = typeof currentStack === 'number' ? currentStack : FALLBACK_MAX_AMOUNT;
    return Math.max(bigBlind, stackCap);
  }, [bigBlind, currentStack]);
  const allIn = betAmount >= maxAmount;

  const canAct = useMemo(() => isMyTurn && !isSubmitting, [isMyTurn, isSubmitting]);

  const clampBetAmount = useCallback(
    (value: number) => {
      if (!Number.isFinite(value)) {
        return bigBlind;
      }

      return Math.max(bigBlind, Math.min(maxAmount, value));
    },
    [bigBlind, maxAmount],
  );

  const snapToNearest = useCallback((value: number, increment: number) => {
    return Math.round(value / increment) * increment;
  }, []);

  const executeAction = useCallback(
    async <TRoute extends ActionRoute>(route: TRoute, payload: APIMethodMap[TRoute]['request'], successMessage: string) => {
      setErrorMessage('');
      setStatusMessage('');
      setIsSubmitting(true);

      const result = await apiCall.post(route, payload);
      if (!result?.ok) {
        setErrorMessage(result?.error?.message ?? 'Action failed. Please try again.');
        setIsSubmitting(false);
        return false;
      }

      setStatusMessage(successMessage);
      setIsSubmitting(false);
      return true;
    },
    [],
  );

  const fold = useCallback(async () => {
    await executeAction('games.fold', { pokerTableName: 'table_1' }, 'Folded');
  }, [executeAction]);

  const check = useCallback(async () => {
    await executeAction('games.check', { pokerTableName: 'table_1' }, 'Checked');
  }, [executeAction]);

  const call = useCallback(async () => {
    await executeAction('games.call', { pokerTableName: 'table_1' }, 'Called');
  }, [executeAction]);

  const bet = useCallback(async () => {
    if (betAmount < bigBlind) {
      setErrorMessage(`Minimum bet amount is ${bigBlind}`);
      setBetAmount(bigBlind);
      return;
    }

    if (betAmount > maxAmount) {
      setErrorMessage(`Maximum bet amount is ${maxAmount}`);
      setBetAmount(maxAmount);
      return;
    }

    await executeAction('games.bet', { pokerTableName: 'table_1', amount: betAmount }, allIn ? 'All in' : 'Bet placed');
  }, [allIn, betAmount, bigBlind, executeAction, maxAmount]);

  useEffect(() => {
    setBetAmount((prev) => clampBetAmount(prev));
  }, [clampBetAmount]);

  const handleBetInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const snappedValue = snapToNearest(value, bigBlind);
    const clampedValue = clampBetAmount(snappedValue);

    setBetAmount(clampedValue);
    setErrorMessage('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const clampedValue = clampBetAmount(value);
    setBetAmount(clampedValue);
    setErrorMessage('');
  };

  return (
    <div id="player-actions">
      <div className="action-status">{canAct ? 'Your turn' : 'Waiting for your turn'}</div>
      <div className="slidecontainer">
        <input
          type="range"
          min={bigBlind}
          max={maxAmount}
          step={bigBlind}
          value={betAmount}
          className="slider"
          id="myRange"
          onChange={handleBetInputChange}
          disabled={!canAct}
        />
        <input
          id="bet-input"
          type="number"
          min={bigBlind}
          max={maxAmount}
          step={bigBlind}
          value={betAmount}
          onChange={handleInputChange}
          disabled={!canAct}
        />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {statusMessage && !errorMessage && <div className="action-message">{statusMessage}</div>}

      <div className="action-buttons-row">
        <button className="action-buttons" id="fold-action-button" aria-label="Fold" onClick={fold} disabled={!canAct}>
          Fold
        </button>
        <button className="action-buttons" id="check-action-button" aria-label="Check" onClick={check} disabled={!canAct}>
          Check
        </button>
        <button className="action-buttons" id="call-action-button" aria-label="Call" onClick={call} disabled={!canAct}>
          Call
        </button>
        <button className="action-buttons" id="raise-action-button" aria-label="Bet" onClick={bet} disabled={!canAct}>
          {isSubmitting ? 'Sending...' : allIn ? 'All In' : 'Bet'}
        </button>
      </div>
      <div className="bet-limits">
        <span>Min {bigBlind}</span>
        <span>Max {maxAmount}</span>
      </div>
    </div>
  );
}

export default Actions;
