import { BaseError } from '@infra/BaseError';

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super('PLAYER_NOT_FOUND_AT_TABLE', 'The player is not seated at the table');
  }
}
