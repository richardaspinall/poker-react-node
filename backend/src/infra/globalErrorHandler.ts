import type { Request, Response, NextFunction } from 'express';

import { InternalError } from '@Shared/api/BaseOutput';

import { Logger } from '../utils/Logger';

const debug = Logger.newDebugger('APP:GlobalErrorHandler');

abstract class BaseErrorHandler {
  abstract handleError(err: Error, req: Request, res: Response, next: NextFunction): void;
}

class GlobalErrorHandler extends BaseErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('Error caught in the error handler middleware');
    console.error(err);
    debug(err);
    return res.status(500).send({ ok: false, error: new InternalError() });
  }
}
const globalErrorHandler = new GlobalErrorHandler();

export { globalErrorHandler as GlobalErrorHandler };
