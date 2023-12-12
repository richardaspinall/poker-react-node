import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import FetchFasade from '../../../fetch/FetchFasade';

import { PlayerSitPayload, PlayerSitResult } from '../../../../../backend/src/shared/api/types/PlayerSit';

type SeatProps = {
  seatNumber: string;
  chipCount: number;
  socket: Socket;
};

export default function Seat({ seatNumber, chipCount, socket }: SeatProps) {
  const playerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await FetchFasade.post<PlayerSitPayload, PlayerSitResult>('/api/actions/playerSit', payload);
    console.log('result ok check', result);
  }, []);

  return (
    <div className="seat" id={seatNumber} data-chip-count={chipCount} onClick={playerSit}>
      Empty
    </div>
  );
}
