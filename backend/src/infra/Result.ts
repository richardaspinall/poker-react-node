/**
 * Result class to handle success and error cases in a consistent way
 */
export class Result<T> {
  private ok: boolean;
  private value: T | undefined;
  private error?: BaseError;
  protected constructor(ok: boolean, value: T | undefined = undefined, error?: BaseError) {
    if (ok && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!ok && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }
    this.ok = ok;
    this.value = value;
    this.error = error;

    Object.freeze(this);
  }

  public isOk(): boolean {
    return this.ok;
  }

  public isError(): boolean {
    return !this.ok;
  }

  public getValue(): T {
    if (this.error) throw new Error(this.error.code);
    if (!this.value) throw new Error('Value is undefined');
    return this.value;
  }

  public getError(): BaseError {
    if (!this.error) throw new Error('Error is undefined');
    return this.error;
  }

  static success(): Result<void> {
    return new Result(true);
  }

  static error(error: BaseError): Result<undefined> {
    return new Result(false, undefined, error);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.error) return result;
    }
    return Result.success();
  }
}

/**
 * ResultError class to handle error cases
 */
export class ResultError<T> extends Result<T> {
  constructor(error: BaseError) {
    super(false, undefined, error);
  }
}

/**
 * ResultSuccess class to handle error cases
 */
export class ResultSuccess<T> extends Result<T> {
  constructor(value: T) {
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
