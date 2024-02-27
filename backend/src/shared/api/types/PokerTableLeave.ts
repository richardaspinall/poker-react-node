// Types
import type { BaseOutput } from './BaseOutput';

// External
import Joi from 'joi';

// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';

// Internal utils
import { Logger } from '../../../utils/Logger';

const debug = Logger.newDebugger('APP:Validation');

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
