import { useCallback } from 'react';

import apiCall from '../../../fetch/apiCall';

type SeatProps = {
  seatNumber: number;
  userName?: string;
  chipCount: number;
};

export default function Seat({ seatNumber, userName, chipCount }: SeatProps) {
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
        {userName ? userName : 'Empty'}
      </button>
      <button onClick={playerLeave}>Leave Seat {seatNumber}</button>
    </div>
  );
}
