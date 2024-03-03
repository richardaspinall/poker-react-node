import { BaseError } from '@shared/Result';

export class InvalidRequestPayloadError extends BaseError {
  constructor(details: any) {
    super('INVALID_REQUEST_PAYLOAD', 'Invalid request payload', details);
  }
}