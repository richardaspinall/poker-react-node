import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';
import FetchFasade from '../../fetch/FetchFasade';

type Props = {
  seatNumber: string;
  socket: Socket;
};

export default function Seat({ seatNumber, socket }: Props) {
  const playerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await FetchFasade.post('/api/actions/playerSit', payload);

    if (result.ok) {
      console.log(result.getValue());
    } else {
      console.log('error', result.errorMessage);
    }
  }, []);

  return (
    <div className="seat" id={seatNumber} data-chip-count="0" onClick={playerSit}>
      Empty
    </div>
  );
}
