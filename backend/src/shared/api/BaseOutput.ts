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

class APIError implements IAPIError {
  protected constructor(public errorCode: string, public errorMessage?: string, public errorDetails?: any) {}
}

export class MethodNotImplementedError extends APIError {
  constructor() {
    super('method_not_implemented', 'API not implemented');
  }
}

export class InternalError extends APIError {
  constructor() {
    super('internal_error', 'An internal error occurred');
  }
}
