// External
import Joi from 'joi';

// Internal

import Result, { ResultError, ResultSuccess } from '../../Result';

// Internal utils
import Logger from '../../../utils/Logger';

const debug = Logger.newDebugger('APP:Validation');

export type PlayerSitPayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export type PlayerSitOutput = {
  ok: boolean;
  error?: string;
  error_details?: string;
};

// Joi schema
export const tableJoinSchema = Joi.object({
  selectedSeatNumber: Joi.string().required(),
  socketId: Joi.string().required(),
});

export function validatePlayerSitPayload(payload: any): Result<PlayerSitPayload> {
  // Runtime validation with Joi
  const { error, value } = tableJoinSchema.validate(payload, { abortEarly: false });

  if (error) {
    debug(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res: PlayerSitPayload = value;

  return new ResultSuccess(res);
}
