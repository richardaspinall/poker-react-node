// Types
import { BaseOutput } from './BaseOutput';
import { BaseError } from '@Infra/Result';

// External
import Joi from 'joi';

export type PokerTableLeavePayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export interface PokerTableLeaveOutput extends BaseOutput {}

// Joi schema
export const pokerTableLeaveSchema = Joi.object<PokerTableLeavePayload>({
  selectedSeatNumber: Joi.string().required(),
  socketId: Joi.string().required(),
});

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super('player_not_found_at_table', 'Player is not seated at the table');
  }
}

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('table_does_not_exist', 'Table does not exist');
  }
}
