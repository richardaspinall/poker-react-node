import { BaseError } from '@infra/BaseError';

export class CurrentActionUndefined extends BaseError {
  constructor() {
    super('current_action_undefined', 'Current action undefined');
  }
}
