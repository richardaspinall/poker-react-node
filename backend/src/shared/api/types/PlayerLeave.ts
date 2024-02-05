// External
import Joi from 'joi';

// Internal
import Result, { ResultError, ResultSuccess } from '../../Result';
import { BaseOutput } from './BaseOutput';

// Internal utils
import Logger from '../../../utils/Logger';

const debug = Logger.newDebugger('APP:Validation');

export type PlayerLeavePayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export interface PlayerLeaveOutput extends BaseOutput {
  ok: boolean;
  error?: string;
  error_details?: string;
}

// Joi schema
export const tableLeaveSchema = Joi.object({
  selectedSeatNumber: Joi.string().required(),
  socketId: Joi.string().required(),
});

/*
 * Depreacted: use shared/validatePayload.ts
 *
 * @param payload – the incoming payload to validate against Joi schema
 *
 *
 */
export function validateTableLeavePayload(payload: any): Result<PlayerLeavePayload> {
  // Runtime validation with Joi
  const { error, value } = tableLeaveSchema.validate(payload, { abortEarly: false });

  if (error) {
    debug(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res: PlayerLeavePayload = value;

  return new ResultSuccess(res);
}
