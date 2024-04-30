import type { Request, Response } from 'express';
import Joi from 'joi';

import { IBaseError } from '@infra/BaseError';
import { Result } from '@infra/Result';
import type { BaseOutput } from '@shared/api/BaseOutput';
import type { APIHandler } from '@shared/api/gen/APIMethodMap';

import { Logger } from '../utils/Logger';
import { ErrorHandler } from './ErrorHandler';
import { InvalidRequestPayloadError, InvalidResponsePayloadError } from './ValidationErrors';
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
export abstract class BaseHandler<TPayload, TOutput extends BaseOutput> implements APIHandler {
  /**
   *  @param validationSchema - The Joi schema that the payload will be validated against
   */
  private validationSchema: Joi.ObjectSchema<TPayload>;
  private outputValidationSchema: Joi.ObjectSchema<TOutput>;
  private clientErrorCodes: { [key: string]: string };
  protected requiresAuthentication: boolean;

  constructor(
    validationSchema: Joi.ObjectSchema<TPayload>,
    outputValidationSchema: Joi.ObjectSchema<TOutput>,
    clientErrorCodes: { [key: string]: string },
    requiresAuthentication: boolean = true,
  ) {
    this.validationSchema = validationSchema;
    this.outputValidationSchema = outputValidationSchema;
    this.clientErrorCodes = clientErrorCodes;
    this.requiresAuthentication = requiresAuthentication;
  }

  protected abstract getResult(payload: TPayload, user?: string, req?: Request<TPayload>): Promise<Result<any>>;

  public async runHandler(req: Request<TPayload>, res: Response<BaseOutput>) {
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
      return this.handleError(new InvalidRequestPayloadError(error), res);
    }

    const userParam = this.requiresAuthentication ? user : undefined;
    const output = await this.getResult(payload.getValue(), userParam, this.requiresAuthentication ? undefined : req);

    if (output.isError()) {
      const error = output.getError();
      return this.handleError(error, res);
    }

    const outputPayload = validatePayload<TOutput>(this.outputValidationSchema, output.getValue());
    if (outputPayload.isError()) {
      const error = outputPayload.getError();

      return this.handleError(new InvalidResponsePayloadError(error), res);
    }

    return res.send(outputPayload.getValue());
  }

  protected handleError(error: IBaseError, res: Response) {
    return ErrorHandler.handleError(error, this.clientErrorCodes, res);
  }
}
