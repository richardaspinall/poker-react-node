import { BaseError } from '@infra/BaseError';

export class ActionInvalidError extends BaseError {
  constructor() {
    super('ACTION_INVALID', 'Players action is invalid');
  }
}
