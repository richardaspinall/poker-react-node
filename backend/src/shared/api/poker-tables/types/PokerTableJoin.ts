import Joi from 'joi';

import { BaseOutput } from '../../BaseOutput';

export type PokerTableJoinPayload = {
  selectedSeatNumber: string;
};

export interface PokerTableJoinOutput extends BaseOutput {}

export const PokerTableJoinPayloadSchema = Joi.object<PokerTableJoinPayload>({
  selectedSeatNumber: Joi.string().required(),
});

export const PokerTableJoinOutputSchema = Joi.object({
  ok: Joi.boolean().required(),
}).unknown(false);

export enum PokerTableJoinErrorCodes {
  SeatTaken = 'seat_taken',
  PlayerAlreadySeated = 'player_already_seated',
  PlayerNotFound = 'player_not_found_at_table',
}
