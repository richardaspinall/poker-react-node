import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Card as CardType } from '../../../../../backend/src/shared/game/types/Deck';
import apiCall from '../../../fetch/apiCall';
import { selectUsername } from '../../../store/selectors.ts';
import { Card } from '../../Card/Card.tsx';

type SeatProps = {
  seatNumber: number;
  userName?: string;
  chipCount: number;
  cards?: CardType[];
};

export default function Seat({ seatNumber, userName, chipCount, cards }: SeatProps) {
  const myUsername = useSelector(selectUsername);

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
  return (
    <div>
      <button className="seat" id={`seat-${seatNumber}`} data-chip-count={chipCount} onClick={onPlayerSit}>
        {myUsername === userName && cards?.[0] ? (
          <>
            <Card cardCode={cards[0].shortCode} />
            <Card cardCode={cards[1].shortCode} />
          </>
        ) : userName ? (
          userName
        ) : (
          'Empty'
        )}
      </button>
      <button onClick={playerLeave}>Leave Seat {seatNumber}</button>
    </div>
  );
}
