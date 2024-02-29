// Consistent output for all API calls
export type BaseOutput = {
  ok: boolean;
  payload?: unknown;
  error?: APIError;
};

export type APIError = {
  code: string;
  message?: string;
  errorDetails?: any;
};
