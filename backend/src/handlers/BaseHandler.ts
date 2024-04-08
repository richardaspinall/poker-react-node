import type { Request, Response } from 'express';
import Joi from 'joi';

import { IBaseError } from '@infra/BaseError';
import type { ApiHandler } from '@shared/api/ApiMethodMap';
import type { BaseOutput } from '@shared/api/BaseOutput';

import { ErrorHandler } from './ErrorHandler';
import { Logger } from '../utils/Logger';
import { UserNotAuthedError } from './users/errors/UserNotAuthedError';
import { validatePayload } from './validatePayload';

/**
 * BaseHandler is used to handle requests to the server. It is designed to be extended by other classes
 *
 * @param TPayload - The type of the payload that the handler will receive
 * @param TOutput - The type of the output that the handler will return
 *
 * @function getResult - This function is implemented by the child class. It is responsible for taking the payload and returning the result
 * @function runHandler - This function is responsible for running the handler. It will validate the payload and then call getResult
 */
export abstract class BaseHandler<TPayload, TOutput extends BaseOutput> implements ApiHandler {
  /**
   *  @param validationSchema - The Joi schema that the payload will be validated against
   */
  private validationSchema: Joi.ObjectSchema<TPayload>;
  private clientErrorCodes: { [key: string]: string };
  protected requiresAuthentication: boolean;

  constructor(
    validationSchema: Joi.ObjectSchema<TPayload>,
    clientErrorCodes: { [key: string]: string },
    requiresAuthentication: boolean = true
  ) {
    this.validationSchema = validationSchema;
    this.clientErrorCodes = clientErrorCodes;
    this.requiresAuthentication = requiresAuthentication;
  }

  protected abstract getResult(payload: TPayload, res: Response<TOutput>, req?: Request<TPayload>, user?: string): any;

  public runHandler(req: Request<TPayload>, res: Response<BaseOutput>) {
    let user = undefined;
    if (this.requiresAuthentication) {
      user = req.session.username;
      const userAuthenticated = req.session.authenticated;

      if (!userAuthenticated) {
        Logger.info('User not authenticated');
        return this.handleError(new UserNotAuthedError(), res);
      }
    }

    const payload = validatePayload<TPayload>(this.validationSchema, req.body);

    if (payload.isError()) {
      const error = payload.getError();
      return this.handleError(error, res);
    }

    if (this.requiresAuthentication) {
      return this.getResult(payload.getValue(), res, undefined, user);
    }
    return this.getResult(payload.getValue(), res, req);
  }

  protected handleError(error: IBaseError, res: Response) {
    return ErrorHandler.handleError(error, this.clientErrorCodes, res);
  }
}
