import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import FetchFasade from '../../../fetch/FetchFasade';

import { PlayerSitPayload, PlayerSitOutput } from '../../../../../backend/src/shared/api/types/PlayerSit';

type SeatProps = {
  seatNumber: string;
  chipCount: number;
  socket: Socket;
};

export default function Seat({ seatNumber, chipCount, socket }: SeatProps) {
  const playerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    console.log('result ok check', result);
    const result = await FetchFasade.post<PlayerSitPayload, PlayerSitOutput>('/api/actions/tables.join', payload);
  }, []);

  return (
    <div className="seat" id={seatNumber} data-chip-count={chipCount} onClick={playerSit}>
      Empty
    </div>
  );
}
