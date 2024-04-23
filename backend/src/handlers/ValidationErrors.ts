import { BaseError } from '@infra/BaseError';

export class InvalidPayloadError extends BaseError {
  constructor(details: any) {
    super('invalid_payload', 'Invalid payload', details);
  }
}

export class InvalidRequestPayloadError extends BaseError {
  constructor(details: any) {
    super('invalid_request_payload', 'Invalid request payload', details);
  }
}

export class InvalidResponsePayloadError extends BaseError {
  constructor(details: any) {
    super('invalid_response_payload', 'Invalid response payload', details);
  }
}
