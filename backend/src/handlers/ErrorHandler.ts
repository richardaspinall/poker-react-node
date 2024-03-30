import type { Response } from 'express';

import { IBaseError } from '@infra/BaseError';

import { mapBaseErrorToAPIError } from './helpers/mapBaseErrorToAPIError';

export class ErrorHandler {
  static isValidErrorCode(errorCode: string, enumType: { [key: string]: string }): boolean {
    return Object.values(enumType).includes(errorCode);
  }

  static handleError(error: IBaseError, enumType: { [key: string]: string }, res: Response) {
    if (this.isValidErrorCode(error.code, enumType) || error.code === 'invalid_request_payload') {
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(error),
      });
    }

    // Catches in the GlobalErrorHandler and logs the error and returns an internal error
    throw error;
  }
}
