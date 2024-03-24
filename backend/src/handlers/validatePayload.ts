// External
import Joi from 'joi';

// Internal
import { Result, ResultError, ResultSuccess } from '@infra/Result';
import { InvalidRequestPayloadError } from './ValidationErrors';

// Internal utils
import { Logger } from '../utils/Logger';

const debug = Logger.newDebugger('APP:Validation');

/**
 * validatePayload is a function that is used to validate incoming payloads against a Joi schema
 *
 * @param validationSchema – the Joi schema that the payload will be validated against which is
 * from the handler
 * @param payload – the incoming payload to validate against Joi schema which could be anything
 * @returns a payload wrapped in a Result where errors or values can be found
 */
export function validatePayload<TPayload>(
  validationSchema: Joi.ObjectSchema<TPayload>,
  payload: any
): Result<TPayload> {
  const { error, value } = validationSchema.validate(payload, { abortEarly: false });

  if (error) {
    debug(error.details);
    return new ResultError(new InvalidRequestPayloadError(error.details));
  }

  return new ResultSuccess(value);
}
