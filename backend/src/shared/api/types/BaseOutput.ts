import { BaseError } from '@shared/Result';

// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: unknown;
  error?: BaseError;
};
