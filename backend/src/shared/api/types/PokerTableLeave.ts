// External
import Joi from 'joi';

// Internal

import Result, { ResultError, ResultSuccess } from '../../Result';
import { BaseOutput } from './BaseOutput';

// Internal utils
import Logger from '../../../utils/Logger';

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

export function validatePlayerSitPayload(payload: any): Result<PlayerSitPayload> {
  // Runtime validation with Joi
  const { error, value } = pokerTableLeaveSchema.validate(payload, { abortEarly: false });

  if (error) {
    debug(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res: PokerTableLeavePayload = value;

  return new ResultSuccess(res);
}
