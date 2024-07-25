import { BaseError } from '@infra/BaseError';

export class CurrentActionUndefined extends BaseError {
  constructor() {
    super('CURRENT_ACTION_UNDEFINED', 'Current action undefined');
  }
}
