import { BaseError } from '@infra/BaseError';

export class InvalidPayloadError extends BaseError {
  constructor(details: any) {
    super('INVALID_PAYLOAD', 'Invalid payload', details);
  }
}

export class InvalidRequestPayloadError extends BaseError {
  constructor(details: any) {
    super('INVALID_REQUEST_PAYLOAD', 'Invalid request payload', details);
  }
}

export class InvalidResponsePayloadError extends BaseError {
  constructor(details: any) {
    super(
      'invalid_response_payload',
      'There is a mismatch with what is actually returned and the associated OutputSchema for the handler. Ensure to only return what you have defined in the OutputSchema of the handler',
      details,
    );
  }
}
