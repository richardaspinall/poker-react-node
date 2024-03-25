export interface IBaseError {
  code: string;
  message?: string;
  errorDetails?: any;
  stack?: string;
}

export class BaseError extends Error implements IBaseError {
  constructor(public code: string, public message: string, public errorDetails?: any) {
    super(message);
  }
}
