import { useCallback, useMemo } from 'react';

import { Card as CardType } from '../../../../../backend/src/shared/game/types/Card';
import { CardShortCode } from '../../../../../backend/src/shared/game/types/CardShortCode';
import apiCall from '../../../fetch/apiCall';
import { Card } from '../../Card/Card.tsx';
import ChipDisplay from '../../Chips/ChipDisplay';
import CountdownIndicator from '../../CountdownIndicator/CountdownIndicator.tsx';

type SeatProps = {
  seatNumber: number;
  viewSlot: number;
  myUsername?: string;
  seatUsername?: string;
  cards?: CardType[];
  isActingSeat?: boolean;
  playersCurrentBets?: { currentBet: number; seatNumber: number; chipCount: number }[];
};

export default function Seat({
  seatNumber,
  viewSlot,
  myUsername,
  seatUsername,
  cards,
  isActingSeat,
  playersCurrentBets,
}: Readonly<SeatProps>) {
  const isOccupied = Boolean(seatUsername);
  const isMySeat = Boolean(myUsername && seatUsername && myUsername === seatUsername);
  const canJoin = !isOccupied;

  const onPlayerSit = useCallback(async () => {
    const payload = { selectedSeatNumber: seatNumber };

    const result = await apiCall.post('poker-tables.join', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [seatNumber]);

  const playerLeave = useCallback(async () => {
    const payload = { selectedSeatNumber: seatNumber };
    const result = await apiCall.post('poker-tables.leave', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [seatNumber]);

  const betAmount = useMemo(() => {
    return playersCurrentBets?.find((player) => player.seatNumber === seatNumber)?.currentBet;
  }, [seatNumber, playersCurrentBets]);

  const chipCount = useMemo(() => {
    return playersCurrentBets?.find((player) => player.seatNumber === seatNumber)?.chipCount;
  }, [seatNumber, playersCurrentBets]);

  const renderCards = () => {
    if (!seatUsername || !cards?.[0]) {
      return null;
    }

    if (isMySeat) {
      return (
        <div className="hole-cards">
          <Card cardShortCode={cards[0].cardShortCode} />
          <Card cardShortCode={cards[1].cardShortCode} />
        </div>
      );
    }

    return (
      <div className="hole-cards">
        <Card cardShortCode={CardShortCode.FaceDownCard} />
        <Card cardShortCode={CardShortCode.FaceDownCard} />
      </div>
    );
  };

  const handleSeatClick = isMySeat ? playerLeave : canJoin ? onPlayerSit : undefined;

  return (
    <div className={`seat-container view-slot-${viewSlot}`} id={`seat-${seatNumber}`}>
      <button
        className={`seat ${isActingSeat ? 'acting-seat' : ''} ${isMySeat ? 'my-seat' : ''}`}
        onClick={handleSeatClick}
        disabled={!canJoin && !isMySeat}
        aria-label={isMySeat ? `Leave seat ${seatNumber}` : `Join seat ${seatNumber}`}
      >
        <div className="seat-cards-pop">{renderCards()}</div>
        <span className="seat-cta">{isMySeat ? 'Leave seat' : canJoin ? 'Sit here' : 'Occupied'}</span>
      </button>
      <div className="seat-meta">
        <div className="seat-meta-line seat-meta-name">
          Seat {seatNumber} • {seatUsername ?? 'Open seat'}
        </div>
        <div className="seat-meta-line">
          {typeof chipCount === 'number' ? `Stack ${chipCount}` : 'Stack -'}
          {typeof betAmount === 'number' && betAmount > 0 ? ` • Bet ${betAmount}` : ''}
        </div>
        {isActingSeat && (
          <div className="countdown-indicator">
            <CountdownIndicator initialCount={10} duration={10000} />
          </div>
        )}
      </div>
      {typeof betAmount === 'number' && betAmount > 0 && (
        <ChipDisplay totalValue={betAmount} className="seat-bet-chip-display" />
      )}
    </div>
  );
}
