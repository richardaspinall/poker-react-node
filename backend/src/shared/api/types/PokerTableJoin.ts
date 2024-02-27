// Types
import { BaseOutput } from './BaseOutput';

// External
import Joi from 'joi';

// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';

// Internal utils
import { Logger } from '../../../utils/Logger';

const debug = Logger.newDebugger('APP:Validation');

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
