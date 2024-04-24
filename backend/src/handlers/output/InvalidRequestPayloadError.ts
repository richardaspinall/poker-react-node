import { BaseError } from '@infra/BaseError';

export class InvalidRequestPayload extends BaseError {
    constructor() {
        super('invalid_request_payload', 'The request payload is invalid.');
    }
}