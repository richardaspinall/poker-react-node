import { mapBaseErrorToAPIError } from './mapBaseErrorToAPIError';

describe('mapBaseErrorToAPIError', () => {
  it('should map base error to API error', () => {
    const baseError = {
      code: 'code',
      message: 'message',
      details: 'details',
    };

    const result = mapBaseErrorToAPIError(baseError);

    expect(result).toEqual({
      code: 'code',
      message: 'message',
      details: 'details',
    });
  });
});
