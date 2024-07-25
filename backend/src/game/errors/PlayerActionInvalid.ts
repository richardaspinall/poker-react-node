import { BaseError } from '@infra/BaseError';

export class PlayerActionInvalid extends BaseError {
  constructor() {
    super('PLAYER_ACTION_INVALID', 'Player action is invalid');
  }
}
