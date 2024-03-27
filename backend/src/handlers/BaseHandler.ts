// Types
import type { Request, Response } from 'express';
import type { BaseOutput } from '@shared/api/BaseOutput';
import type { ApiHandler } from '@shared/api/ApiMethodMap';

// External
import Joi from 'joi';

// Internal
import { validatePayload } from './validatePayload';
import { Result } from '@infra/Result';
import { IBaseError } from '@infra/BaseError';
import { mapBaseErrorToAPIError } from './helpers/mapBaseErrorToAPIError';
import { UserSessionStore } from '../users/UserSessionStore';

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
  constructor(private validationSchema: Joi.ObjectSchema<TPayload>, private enumType: { [key: string]: string }) {}

  protected abstract getResult(payload: Result<TPayload>, res: Response<TOutput>): any;

  public runHandler(req: Request<TPayload>, res: Response<BaseOutput>) {
    const user = UserSessionStore.getUserSession(req.session.id);
    console.log(UserSessionStore.getAllSessions());

    console.log(user);
    const payload = validatePayload<TPayload>(this.validationSchema, req.body);
    console.log(req.session);
    console.log('NEW', req.session.username);
    if (!user?.authenticated) {
      console.log('User not authenticated');
    }
    if (payload.isError()) {
      const error = payload.getError();
      const apiError = mapBaseErrorToAPIError(error);

      res.status(400).send({ ok: false, error: apiError });
      return;
    }

    return this.getResult(payload, res);
  }

  protected handleError(error: IBaseError, res: Response) {
    return ErrorHandler.handleError(error, this.enumType, res);
  }
}

// TODO: Move this to a separate file and tidy up / test
export class ErrorHandler {
  static isValidErrorCode(errorCode: string, enumType: { [key: string]: string }): boolean {
    return Object.values(enumType).includes(errorCode);
  }

  static handleError(error: IBaseError, enumType: { [key: string]: string }, res: Response) {
    if (this.isValidErrorCode(error.code, enumType)) {
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(error),
      });
    }

    throw error;
  }
}
