// Types
import { BaseOutput, BaseAPIError } from './BaseOutput';
import { BaseError } from '@Infra/Result';

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

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super('player_already_seated', 'Player is already seated at the table');
  }
}
export class SeatTakenError extends BaseError {
  constructor() {
    super('seat_taken', 'Seat is taken');
  }
}

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('table_does_not_exist', 'Table does not exist');
  }
}
