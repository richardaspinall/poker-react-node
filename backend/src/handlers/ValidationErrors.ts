import { BaseError } from '@infra/BaseError';

export class InvalidRequestPayloadError extends BaseError {
  constructor(details: any) {
    super('invalid_request_payload', 'Invalid request payload', details);
  }
}
