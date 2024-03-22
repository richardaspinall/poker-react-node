// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: unknown;
  error?: APIError;
};

export interface APIError {
  errorCode: string;
  errorMessage?: string;
  errorDetails?: any;
}

export class BaseAPIError implements APIError {
  constructor(public errorCode: string, public errorMessage?: string, public errorDetails?: any) {}
}

export class MethodNotImplementedError extends BaseAPIError {
  constructor() {
    super('method_not_implemented', 'API not implemented');
  }
}

export class InternalError extends BaseAPIError {
  constructor() {
    super('internal_error', 'An internal error occurred');
  }
}
