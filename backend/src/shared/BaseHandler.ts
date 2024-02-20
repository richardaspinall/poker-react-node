// External
import { Request, Response } from 'express';
import Joi from 'joi';

// Internal
import { BaseOutput } from './api/types/BaseOutput';
import { validatePayload } from './validatePayload';
import Result from './Result';

export default abstract class BaseHandler<TPayload, TOutput extends BaseOutput> {
  constructor(private validationSchema: Joi.ObjectSchema<any>) {}

  // getResult should be implemented by the child class as protected (even though it's not enforced)
  protected abstract getResult(payload: Result<TPayload>, res: Response<TOutput>): any;

  public runHandler(req: Request<TPayload>, res: Response<BaseOutput>) {
    const payload = validatePayload<TPayload>(this.validationSchema, req.body);

    if (payload.isError) {
      res.status(400).send({ ok: false, error: payload.errorMessage, errorDetails: payload.errorDetails });
      return;
    }

    return this.getResult(payload, res);
  }
}
