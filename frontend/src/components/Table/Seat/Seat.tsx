import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client'; // RAVIEW: remove

import apiCall from '../../../fetch/apiCall';

type SeatProps = {
  seatNumber: string;
  chipCount: number;
  socket: Socket;
};

export default function Seat({ seatNumber, chipCount, socket }: SeatProps) {
  const onPlayerSit = useCallback(async () => {
    const payload = { selectedSeatNumber: seatNumber, socketId: socket.id };

    const result = await apiCall.post('poker-tables.join', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [seatNumber, socket]);

  const playerLeave = useCallback(async () => {
    const payload = { selectedSeatNumber: seatNumber, socketId: socket.id };
    const result = await apiCall.post('poker-tables.leave', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [seatNumber, socket]);

  return (
    <div>
      <button className="seat" id={seatNumber} data-chip-count={chipCount} onClick={onPlayerSit}>
        Empty
      </button>
      <button onClick={playerLeave}>Leave Seat {seatNumber}</button>
    </div>
  );
}
