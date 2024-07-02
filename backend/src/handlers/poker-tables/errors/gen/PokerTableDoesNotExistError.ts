import { BaseError } from '@infra/BaseError';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('POKER_TABLE_DOES_NOT_EXIST', 'The poker table does not exist');
  }
}
