import { IBaseError } from '@infra/BaseError';

import { IAPIError } from '../../shared/api/BaseOutput';

export function mapBaseErrorToAPIError(baseError: IBaseError): IAPIError {
  return {
    code: baseError.code,
    message: baseError.message,
    details: baseError.details,
  };
}
