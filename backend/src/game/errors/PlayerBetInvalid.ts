import { BaseError } from '@infra/BaseError';

export class PlayerBetInvalid extends BaseError {
  constructor() {
    super('PLAYER_BET_INVALID', 'Player bet is invalid');
  }
}
