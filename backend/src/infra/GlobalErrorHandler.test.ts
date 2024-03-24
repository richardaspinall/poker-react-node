import { Request, Response, NextFunction } from 'express';

import { GlobalErrorHandler } from './GlobalErrorHandler';

describe('GlobalErrorHandler', () => {
  // Mocking the request object
  const req: Partial<Request> = {};

  // Mocking the response object
  const res: Partial<Response> = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(), // Chainable method
  };

  const next: NextFunction = jest.fn();

  it('should send an internal error', () => {
    const error = {
      code: 'error_code',
      message: 'error_message',
    };

    GlobalErrorHandler.handleError(error as any, req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith({
      ok: false,
      error: {
        errorCode: 'internal_error',
        errorMessage: 'An internal error occurred',
      },
    });
  });

  it('should send a method_not_implemented error', () => {
    const error = {
      code: 'method_not_implemented',
      message: 'error_message',
    };

    GlobalErrorHandler.handleError(error as any, req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith({
      ok: false,
      error: {
        errorCode: 'method_not_implemented',
        errorMessage: 'error_message',
      },
    });
  });
});
