import { BaseError } from '@infra/BaseError';

// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: unknown;
  error?: IAPIError;
};

export interface IAPIError {
  code: string;
  message?: string;
  details?: string;
}

export enum BaseErrorCodes {
  MethodNotImplemented = 'METHOD_NOT_IMPLEMENTED',
}

export class MethodNotImplementedError extends BaseError {
  constructor() {
    super(BaseErrorCodes.MethodNotImplemented, 'API not implemented');
  }
}

export class InternalError extends BaseError {
  constructor() {
    super('INTERNAL_ERROR', 'An internal error occurred');
  }
}
