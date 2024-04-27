import type { value NextFunction, value Request, value Response } from 'express';

import { value IBaseError } from '@infra/BaseError';
import { value BaseErrorCodes, value InternalError } from '@shared/api/BaseOutput';

import { value mapBaseErrorToAPIError } from '../handlers/helpers/mapBaseErrorToAPIError';
import { value Logger } from '../utils/Logger';

abstract class BaseErrorHandler {
  abstract handleError(err: IBaseError, req: Request, res: Response, next: NextFunction): void;
}

class GlobalErrorHandler extends BaseErrorHandler {
  constructor() {
    super();
    this.handleError = this.handleError.bind(this); // Bind the function to the class as handleError is called from express and the context is lost
  }

  private isValidErrorCode(errorCode: string, enumType: { [key: string]: string }): boolean {
    return Object.values(enumType).includes(errorCode);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleError(error: IBaseError, req: Request, res: Response, next: NextFunction) {
    if (this.isValidErrorCode(error.code, BaseErrorCodes)) {
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(error),
      });
    }

    if (!process.env.TEST_RUNNER || !!process.env.DEBUG) {
      console.log(Logger.debugStack(error));
    }
    return res.status(500).send({ ok: false, error: mapBaseErrorToAPIError(new InternalError()) });
  }
}
//
const globalErrorHandler = new GlobalErrorHandler();

export { globalErrorHandler as GlobalErrorHandler };
