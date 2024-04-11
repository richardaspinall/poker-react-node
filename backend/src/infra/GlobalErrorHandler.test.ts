import { NextFunction, Request, Response } from 'express';

import { TestError } from '@tests/helpers/TestError';

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

  const testError = new TestError();
  it('should send an internal error', () => {
    GlobalErrorHandler.handleError(testError, req as Request, res as Response, next);

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

    GlobalErrorHandler.handleError(error, req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith({
      ok: false,
      error: {
        errorCode: 'method_not_implemented',
        errorMessage: 'error_message',
      },
    });
  });
});
