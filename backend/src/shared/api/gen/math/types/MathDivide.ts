import { BaseOutput } from '../../../BaseOutput';

export interface MathDividePayload {
  a: number;
  b: number;
}

export interface MathDivideOutput extends BaseOutput {
  ok: boolean;
  result: number;
}

export enum MathDivideErrorCodes {
  DivideByZeroError = 'divide_by_error_code',
}
