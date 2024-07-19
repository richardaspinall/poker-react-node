import { useCallback, useMemo } from 'react';

import { Card as CardType } from '../../../../../backend/src/shared/game/types/Card';
import { CardShortCode } from '../../../../../backend/src/shared/game/types/CardShortCode';
import apiCall from '../../../fetch/apiCall';
import { Card } from '../../Card/Card.tsx';
import ChipDisplay from '../../Chips/ChipDisplay';
import CountdownIndicator from '../../CountdownIndicator/CountdownIndicator.tsx';

type SeatProps = {
  seatNumber: number;
  chipCount: number;
  myUsername?: string;
  seatUsername?: string;
  cards?: CardType[];
  isActingSeat?: boolean;
  playersCurrentBets?: { currentBet: number; seatNumber: number; chipCount: number }[];
};

export default function Seat({
  seatNumber,
  myUsername,
  seatUsername,
  cards,
  isActingSeat,
  playersCurrentBets,
}: Readonly<SeatProps>) {
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

  // Define a function to render the cards if the user is in the hand
  // TODO: will need to update this to show the cards if the user is actually in the hand
  const renderSeatDisplay = () => {
    if (myUsername === seatUsername && cards?.[0]) {
      return (
        <>
          <Card cardShortCode={cards[0].cardShortCode} />
          <Card cardShortCode={cards[1].cardShortCode} />
        </>
      );
    } else if (seatUsername && cards?.[0]) {
      return (
        <>
          <Card cardShortCode={CardShortCode.FaceDownCard} />
          <Card cardShortCode={CardShortCode.FaceDownCard} />
        </>
      );
    } else if (seatUsername) {
      return seatUsername;
    }
    return 'Empty';
  };

  return (
    <div>
      <button className={'seat'} id={`seat-${seatNumber}`} data-chip-count={chipCount} onClick={onPlayerSit}>
        {renderSeatDisplay()}
        {isActingSeat && (
          <div className="countdown-indicator">
            <CountdownIndicator initialCount={10} duration={10000} />
          </div>
        )}
        {betAmount && <ChipDisplay totalValue={betAmount} />}
      </button>

      {myUsername === seatUsername ? <button onClick={playerLeave}>Leave seat</button> : null}
    </div>
  );
}
