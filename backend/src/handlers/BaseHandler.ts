// Types
import type { Request, Response } from 'express';
import type { BaseOutput } from '@Shared/api/types/BaseOutput';
import type { APIHandler } from '@Shared/api/APIMethodMap';

// External
import Joi from 'joi';

// Internal
import { validatePayload } from './validatePayload';
import { Result } from '@Infra/Result';

/**
 * BaseHandler is used to handle requests to the server. It is designed to be extended by other classes
 *
 * @param TPayload - The type of the payload that the handler will receive
 * @param TOutput - The type of the output that the handler will return
 *
 * @function getResult - This function is implemented by the child class. It is responsible for taking the payload and returning the result
 * @function runHandler - This function is responsible for running the handler. It will validate the payload and then call getResult
 */
export abstract class BaseHandler<TPayload, TOutput extends BaseOutput> implements APIHandler {
  /**
   *  @param validationSchema - The Joi schema that the payload will be validated against
   */
  constructor(private validationSchema: Joi.ObjectSchema<TPayload>) {}

  protected abstract getResult(payload: Result<TPayload>, res: Response<TOutput>): any;

  public runHandler(req: Request<TPayload>, res: Response<BaseOutput>) {
    const payload = validatePayload<TPayload>(this.validationSchema, req.body);

    if (payload.isError()) {
      res.status(400).send({ ok: false, error: payload.getError() });
      return;
    }

    return this.getResult(payload, res);
  }
}
