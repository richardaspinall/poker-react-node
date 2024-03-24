import { BaseError } from '@infra/BaseError';

export class PokerTableNameTakenError extends BaseError {
  constructor() {
    super('name_taken', 'Poker table name taken');
  }
}
