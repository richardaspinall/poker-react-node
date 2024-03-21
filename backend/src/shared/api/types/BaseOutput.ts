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

export class APINotImplementedError extends BaseAPIError {
  constructor() {
    super('API_NOT_IMPLEMENTED', 'API not implemented');
  }
}

export class InternalError extends BaseAPIError {
  constructor() {
    super('INTERNAL_ERROR', 'An internal error occurred');
  }
}
