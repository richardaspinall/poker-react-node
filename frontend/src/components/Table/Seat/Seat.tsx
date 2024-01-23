import React, { useCallback } from 'react';

import { Socket } from 'socket.io-client';

import apiCall from '../../../fetch/apiCall';

type SeatProps = {
  seatNumber: string;
  stack: number;
  socket: Socket;
};

const Seat = ({ seatNumber, stack, socket }: SeatProps) => {
  const onPlayerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await apiCall.post('/api/actions/tables.join', payload);
    if (!result?.ok) {
      console.log(result?.error);
    }
  }, []);

  return (
    <div className="seat" id={seatNumber} data-stack={stack} onClick={onPlayerSit}>
      Empty
    </div>
  );
};

export default Seat;
