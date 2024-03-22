import { BaseError } from '@Infra/Result';

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super('player_not_found_at_table', 'Player is not seated at the table');
  }
}
