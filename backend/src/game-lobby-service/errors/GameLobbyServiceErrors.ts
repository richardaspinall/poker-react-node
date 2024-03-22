import { BaseError } from '@Infra/Result';

export class PokerTableNameTakenError extends BaseError {
  constructor() {
    super('NAME_TAKEN', 'Poker table name taken');
  }
}
