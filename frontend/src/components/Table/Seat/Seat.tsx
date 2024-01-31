import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import apiCall from '../../../fetch/apiCall';

type SeatProps = {
  seatNumber: string;
  chipCount: number;
  socket: Socket;
};

export default function Seat({ seatNumber, chipCount, socket }: SeatProps) {
  const onPlayerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };

    const result = await apiCall.post('tables.join', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, []);

  const playerLeave = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await apiCall.post('tables.leave', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, []);

  return (
    <div>
      <button className="seat" id={seatNumber} data-chip-count={chipCount} onClick={onPlayerSit}>
        Empty
      </button>
      <button onClick={playerLeave}>Leave Seat {seatNumber}</button>
    </div>
  );
}
