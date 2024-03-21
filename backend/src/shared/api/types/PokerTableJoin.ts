// Types
import { BaseOutput } from './BaseOutput';

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

// TODO: api errors should be here
