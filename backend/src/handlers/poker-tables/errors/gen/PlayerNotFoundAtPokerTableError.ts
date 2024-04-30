import { BaseError } from '@infra/BaseError';

export class PlayerNotFoundAtPokerTableError extends BaseError {
  constructor() {
    super('player_not_found_at_poker_table', 'Player is not seated at the table');
  }
}
