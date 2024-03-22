import { IBaseError } from '@Infra/Result';
import { APIError } from '../../shared/api/BaseOutput';

export function mapBaseErrorToAPIError(baseError: IBaseError): APIError {
  return {
    errorCode: baseError.code,
    errorMessage: baseError.message,
    errorDetails: baseError.errorDetails,
  };
}
