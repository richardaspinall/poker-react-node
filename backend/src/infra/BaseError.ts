export interface IBaseError {
  code: string;
  message?: string;
  details?: string;
  stack?: string;
}

export class BaseError extends Error implements IBaseError {
  public code: string;
  public details?: string;

  constructor(code: string, message: string, details?: string) {
    super(message);
    this.code = code.toUpperCase();
    this.details = details;
  }
}
