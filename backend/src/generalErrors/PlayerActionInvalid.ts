import { BaseError } from '@infra/BaseError';

export class PlayerActionInvalid extends BaseError {
  constructor() {
    super('player_action_invalid', 'Player action is invalid');
  }
}
