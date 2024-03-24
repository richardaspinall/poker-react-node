import { BaseError } from '@infra/BaseError';

export class TestError extends BaseError {
  constructor() {
    super('error_code', 'error_message');
  }
}
