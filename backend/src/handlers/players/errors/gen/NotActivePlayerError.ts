import { BaseError } from '@infra/BaseError';

export class NotActivePlayerError extends BaseError {
  constructor() {
    super('player_not_active_player', 'Player is not active player');
  }
}
