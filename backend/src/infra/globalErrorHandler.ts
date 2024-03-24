// Types
import type { Request, Response, NextFunction } from 'express';
import { IBaseError } from '@Infra/Result';

// Internal
import { BaseErrorCodes, InternalError } from '@Shared/api/BaseOutput';
import { mapBaseErrorToAPIError } from '../handlers/helpers/mapBaseErrorToAPIError';

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
        error: mapBaseErrorToAPIError(error),
      });
    }

    debug(error.code);
    debug(Logger.debugStack(error));

    return res.status(500).send({ ok: false, error: mapBaseErrorToAPIError(new InternalError()) });
  }
}
const globalErrorHandler = new GlobalErrorHandler();

export { globalErrorHandler as GlobalErrorHandler };
