import { BaseError } from '@infra/BaseError';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('poker_table_does_not_exist', 'Poker table does not exist');
  }
}
