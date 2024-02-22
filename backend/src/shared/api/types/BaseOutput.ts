// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: any;
  error?: string;
  errorDetails?: string;
};
