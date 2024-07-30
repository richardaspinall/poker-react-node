import { BaseError } from '@infra/BaseError';

export class ActionUndefinedError extends BaseError {
  constructor() {
    super('ACTION_UNDEFINED', 'Player action is undefined');
  }
}
