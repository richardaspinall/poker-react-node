import { BaseError } from '@infra/BaseError';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('pokertable_does_not_exist', 'Table does not exist');
  }
}
