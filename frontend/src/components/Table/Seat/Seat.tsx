import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import FetchFacade from '../../../fetch/FetchFacade';

import { PlayerSitPayload, PlayerSitOutput } from '../../../../../backend/src/shared/api/types/PlayerSit';
import { PlayerLeavePayload, PlayerLeaveOutput } from '../../../../../backend/src/shared/api/types/PlayerLeave';
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
    <div className="seat" id={seatNumber} data-chip-count={chipCount} onClick={onPlayerSit}>
      Empty
    </div>
  );
}
