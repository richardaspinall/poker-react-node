import type { Response } from 'express';

import { IBaseError } from '@infra/BaseError';

import { mapBaseErrorToAPIError } from './helpers/mapBaseErrorToAPIError';

export class ErrorHandler {
  static isValidErrorCode(errorCode: string, clientErrorCodes: { [key: string]: string }): boolean {
    return Object.values(clientErrorCodes).includes(errorCode);
  }

  static handleError(error: IBaseError, clientErrorCodes: { [key: string]: string }, res: Response) {
    if (
      this.isValidErrorCode(error.code, clientErrorCodes) ||
      error.code === 'INVALID_REQUEST_PAYLOAD' ||
      error.code === 'not_authed'
    ) {
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(error),
      });
    }

    // Catches in the GlobalErrorHandler and logs the error and returns an internal error
    throw error;
  }
}
