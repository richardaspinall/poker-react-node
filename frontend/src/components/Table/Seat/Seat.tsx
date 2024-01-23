import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import FetchFasade from '../../../fetch/FetchFasade';

import { PlayerSitPayload, PlayerSitOutput } from '../../../../../backend/src/shared/api/types/PlayerSit';
import { PlayerLeavePayload, PlayerLeaveOutput } from '../../../../../backend/src/shared/api/types/PlayerLeave';

type SeatProps = {
  seatNumber: string;
  chipCount: number;
  socket: Socket;
};

export default function Seat({ seatNumber, chipCount, socket }: SeatProps) {
  const playerSit = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await FetchFasade.post<PlayerSitPayload, PlayerSitOutput>('/api/actions/tables.join', payload);
    if (result.ok) {
      console.log(result.getValue());
    } else {
      console.log('error', result.errorMessage);
    }
  }, []);

  const playerLeave = useCallback(async (event: React.MouseEvent) => {
    const payload = { selectedSeatNumber: event.currentTarget.id, socketId: socket.id };
    const result = await FetchFasade.post<PlayerLeavePayload, PlayerLeaveOutput>('/api/actions/tables.leave', payload);
    if (result.ok) {
      console.log(result.getValue());
    } else {
      console.log('error', result.errorMessage);
    }
  }, []);

  return (
    <div>
      <div className="seat" id={seatNumber} data-chip-count={chipCount} onClick={playerSit}>
        Empty
      </div>
      <div onClick={playerLeave}> Leave Seat {seatNumber} </div>
    </div>
  );
}
