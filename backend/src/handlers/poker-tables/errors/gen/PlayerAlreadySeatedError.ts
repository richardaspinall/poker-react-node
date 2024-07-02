import { BaseError } from '@infra/BaseError';

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super('PLAYER_ALREADY_SEATED', 'Player is already seated at the table');
  }
}
