import type { Request, Response, NextFunction } from 'express';

import { BaseErrorCodes, InternalError } from '@Shared/api/BaseOutput';
import { IBaseError } from '@Infra/Result';

import { Logger } from '../utils/Logger';

const debug = Logger.newDebugger('APP:GlobalErrorHandler');

abstract class BaseErrorHandler {
  abstract handleError(err: IBaseError, req: Request, res: Response, next: NextFunction): void;
}

class GlobalErrorHandler extends BaseErrorHandler {
  constructor() {
    super();
    this.handleError = this.handleError.bind(this); // Bind the function to the class as handleError is called from express and the context is lost
  }

  isValidErrorCode(errorCode: string, enumType: { [key: string]: string }): boolean {
    return Object.values(enumType).includes(errorCode);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public handleError(error: IBaseError, req: Request, res: Response, next: NextFunction) {
    if (this.isValidErrorCode(error.code, BaseErrorCodes)) {
      return res.send({
        ok: false,
        error: error,
      });
    }

    console.log('An unexpected error occured, run npm run start:debug to see more details');
    debug(error.code);
    debug(Logger.debugStack(error));

    return res.status(500).send({ ok: false, error: new InternalError() });
  }
}
const globalErrorHandler = new GlobalErrorHandler();

export { globalErrorHandler as GlobalErrorHandler };
