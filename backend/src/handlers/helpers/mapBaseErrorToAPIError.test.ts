import { mapBaseErrorToAPIError } from './mapBaseErrorToAPIError';

describe('mapBaseErrorToAPIError', () => {
  it('should map base error to API error', () => {
    const baseError = {
      code: 'code',
      message: 'message',
      errorDetails: 'errorDetails',
    };

    const result = mapBaseErrorToAPIError(baseError);

    expect(result).toEqual({
      errorCode: 'code',
      errorMessage: 'message',
      errorDetails: 'errorDetails',
    });
  });
});
