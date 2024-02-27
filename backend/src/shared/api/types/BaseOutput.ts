import { BaseError } from '@shared/Result';

// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: any;
  error?: BaseError;
};
