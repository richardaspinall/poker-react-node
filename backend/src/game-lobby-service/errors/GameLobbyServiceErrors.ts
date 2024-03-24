import { BaseError } from '@Infra/Result';

export class PokerTableNameTakenError extends BaseError {
  constructor() {
    super('name_taken', 'Poker table name taken');
  }
}
