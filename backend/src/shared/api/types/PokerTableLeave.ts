// Types
import type { BaseOutput } from './BaseOutput';

// External
import Joi from 'joi';

// Internal
import Result, { ResultError, ResultSuccess } from '../../Result';

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

/*
 * Depreacted: use shared/validatePayload.ts
 *
 * @param payload – the incoming payload to validate against Joi schema
 *
 * @returns a PokerTableLeavePayload wrapped in a Result where errors or values can be found
 */
export function validatePokerTableLeavePayload(payload: any): Result<PokerTableLeavePayload> {
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
