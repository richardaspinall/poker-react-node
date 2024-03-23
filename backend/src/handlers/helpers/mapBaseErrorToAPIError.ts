import { IBaseError } from '@Infra/Result';
import { IAPIError } from '../../shared/api/BaseOutput';

export function mapBaseErrorToAPIError(baseError: IBaseError): IAPIError {
  return {
    errorCode: baseError.code,
    errorMessage: baseError.message,
    errorDetails: baseError.errorDetails,
  };
}
