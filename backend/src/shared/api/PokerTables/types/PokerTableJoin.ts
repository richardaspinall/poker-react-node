// Types
import { BaseOutput } from '../../BaseOutput';

// External
import Joi from 'joi';

export type PokerTableJoinPayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export interface PokerTableJoinOutput extends BaseOutput {}

// Joi schema
export const pokerTableJoinSchema = Joi.object<PokerTableJoinPayload>({
  selectedSeatNumber: Joi.string().required(),
  socketId: Joi.string().required(),
});

export enum PokerTableErrorCodes {
  SeatTaken = 'seat_taken',
  PlayerAlreadySeated = 'player_already_seated',
  PlayerNotFound = 'player_not_found_at_table',
  TableDoesNotExist = 'table_does_not_exist',
}
