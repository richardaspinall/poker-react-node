import Joi from 'joi';

import Result, { ResultError, ResultSuccess } from '../../Result';

export type PlayerSitPayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export type PlayerSitOutput = {
  ok: boolean;
  error?: string;
};

// Joi schema
export const tableCreateSchema = Joi.object({
  selectedSeatNumber: Joi.string().required(),
  socketId: Joi.string().required(),
});

export function validateTableCreatePayload(payload: any): Result<PlayerSitPayload> {
  // Runtime validation with Joi
  const { error, value } = tableCreateSchema.validate(payload, { abortEarly: false });

  if (error) {
    console.log(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res: PlayerSitPayload = value;

  return new ResultSuccess(res);
}
