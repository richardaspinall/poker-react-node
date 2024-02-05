// External
import Joi from 'joi';

// Internal
import Result, { ResultError, ResultSuccess } from './Result';

// Internal utils
import Logger from '../utils/Logger';

const debug = Logger.newDebugger('APP:Validation');

export function validatePayload<T>(validationSchema: Joi.ObjectSchema<any>, payload: any): Result<T> {
  // Runtime validation with Joi
  const { error, value } = validationSchema.validate(payload, { abortEarly: false });

  if (error) {
    debug(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res = value as T;

  return new ResultSuccess(res);
}
