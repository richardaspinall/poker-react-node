import { BaseError } from '@Infra/Result';

// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: unknown;
  error?: IAPIError;
};

export interface IAPIError {
  errorCode: string;
  errorMessage?: string;
  errorDetails?: any;
}

export enum BaseErrorCodes {
  MethodNotImplemented = 'method_not_implemented',
}

export class MethodNotImplementedError extends BaseError {
  constructor() {
    super(BaseErrorCodes.MethodNotImplemented, 'API not implemented');
  }
}

export class InternalError extends BaseError {
  constructor() {
    super('internal_error', 'An internal error occurred');
  }
}
