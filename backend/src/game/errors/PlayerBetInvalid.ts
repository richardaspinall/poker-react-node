import { BaseError } from '@infra/BaseError';

export class PlayerBetInvalid extends BaseError {
  constructor() {
    super('player_bet_invalid', 'Player bet is invalid');
  }
}