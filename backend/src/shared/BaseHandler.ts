// External
import { Request, Response } from 'express';
import Joi from 'joi';

// Internal
import { BaseOutput } from './api/types/BaseOutput';
import { validatePayload } from './validatePayload';
import Result from './Result';

export default abstract class BaseHandler<TInput> {
  constructor(private validationSchema: Joi.ObjectSchema<any>) {}

  public runHandler(req: Request<TInput>, res: Response<BaseOutput>) {
    const payload = validatePayload<TInput>(this.validationSchema, req.body);

    if (payload.isError) {
      res.status(400).send({ ok: false, error: payload.errorMessage, error_details: payload.errorDetails });
      return;
    }

    return this.getResult(payload, res);
  }
  protected abstract getResult(payload: Result<TInput>, res: Response<BaseOutput>): any;
}
