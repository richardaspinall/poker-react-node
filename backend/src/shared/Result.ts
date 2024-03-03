/**
 * Result class to handle success and error cases in a consistent way
 */
export class Result<T> {
  constructor(public ok: boolean, public value: T | undefined = undefined, public error?: BaseError) {}

  public isOk(): boolean {
    return this.ok;
  }

  public getValue(): T {
    if (this.error) throw new Error(this.error.code);
    if (!this.value) throw new Error('Value is undefined');
    return this.value;
  }

  static success(): Result<void> {
    return new Result(true);
  }

  static error(error: BaseError): Result<undefined> {
    return new Result(false, undefined, error);
  }
}

/**
 * ResultError class to handle error cases
 */
export class ResultError<T> extends Result<T> {
  constructor(public error: BaseError) {
    super(false, undefined, error);
  }
}

/**
 * ResultSuccess class to handle error cases
 */
export class ResultSuccess<T> extends Result<T> {
  constructor(public value: T) {
    super(true, value);
  }
}

interface IBaseError {
  code: string;
  message?: string;
  errorDetails?: any;
}

export class BaseError implements IBaseError {
  constructor(public code: string, public message?: string, public errorDetails?: any) {}
}
