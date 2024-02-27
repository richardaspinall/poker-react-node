// Types
import type { BaseOutput } from './BaseOutput';

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
