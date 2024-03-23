import type { Request, Response, NextFunction } from 'express';

import { InternalError } from '@Shared/api/BaseOutput';

import { Logger } from '../utils/Logger';

const debug = Logger.newDebugger('APP:GlobalErrorHandler');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log('Error caught in the error handler middleware');
  console.error(err);
  debug(err);
  return res.status(500).send({ error: new InternalError() });
  // if (err instanceof ApplicationError) {
  //   res.status(err.statusCode).json({ error: err.message });
  // } else {
  //   // Internal Error Handling
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
}

export { globalErrorHandler };
