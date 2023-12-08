import Joi from 'joi';

import Result, { ResultError, ResultSuccess } from '../../Result';

export type TableCreatePayload = {
  name: string;
  numSeats: number;
};

export type TableCreateResult = {
  ok: boolean;
  error?: string;
};

// Joi schema
export const tableCreateSchema = Joi.object({
  name: Joi.string().required(),
  numSeats: Joi.number().integer().min(2).required(),
});

export function validateTableCreatePayload(payload: any): Result<TableCreatePayload> {
  // Runtime validation with Joi
  const { error, value } = tableCreateSchema.validate(payload, { abortEarly: false });

  if (error) {
    console.log(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res: TableCreatePayload = value;

  return new ResultSuccess(res);
}

export function validatePayload<T>(validationSchema: Joi.ObjectSchema<any>, payload: any): Result<T> {
  // Runtime validation with Joi
  const { error, value } = validationSchema.validate(payload, { abortEarly: false });

  if (error) {
    console.log(error.details);
    return new ResultError('Invalid request payload', error.details);
  }
  // Here, 'value' is validated by Joi, but TypeScript doesn't know its type.
  // You can use type assertion to inform TypeScript about the type.
  const res = value as T;

  return new ResultSuccess(res);
}
