export class Result<T> {
  constructor(
    public ok: boolean,
    public isError: boolean,
    public errorMessage: string = '',
    public errorDetails: any = {},
    public value: T | undefined = undefined
  ) {}

  public getValue(): T {
    if (this.isError) throw new Error(this.errorMessage);
    if (!this.value) throw new Error('Value is undefined');
    return this.value;
  }

  static success(): Result<void> {
    return new Result(true, false);
  }

  static error(errorMessage: string): Result<void> {
    return new Result(false, true, errorMessage);
  }
}

export class ResultError<T> extends Result<T> {
  constructor(public errorMessage: string, public errorDetails: any = {}) {
    super(false, true, errorMessage, errorDetails);
  }
}

export class ResultSuccess<T> extends Result<T> {
  constructor(public value: T) {
    super(true, false, '', value);
  }
}
