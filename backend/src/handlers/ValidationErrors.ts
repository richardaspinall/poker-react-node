import { BaseError } from '@Infra/Result';

export class InvalidRequestPayloadError extends BaseError {
  constructor(details: any) {
    super('invalid_request_payload', 'Invalid request payload', details);
  }
}
