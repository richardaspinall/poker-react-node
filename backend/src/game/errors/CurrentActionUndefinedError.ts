import { BaseError } from '@infra/BaseError';

export class CurrentActionUndefinedError extends BaseError {
  constructor() {
    super('CURRENT_ACTION_UNDEFINED', 'Current action undefined');
  }
}
