import Joi from 'joi';

import { BaseOutput } from '../../BaseOutput';

export type PokerTableLeavePayload = {
  selectedSeatNumber: string;
};

export interface PokerTableLeaveOutput extends BaseOutput {}

// Joi schema
export const pokerTableLeaveSchema = Joi.object<PokerTableLeavePayload>({
  selectedSeatNumber: Joi.string().required(),
});

export enum PokerTableLeaveErrorCodes {
  SeatTaken = 'seat_taken',
  PlayerAlreadySeated = 'player_already_seated',
  PlayerNotFound = 'player_not_found_at_table',
  TableDoesNotExist = 'table_does_not_exist',
}
