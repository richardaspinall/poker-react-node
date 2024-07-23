import { BaseError } from '@infra/BaseError';

export class PlayerActionUndefined extends BaseError {
  constructor() {
    super('player_action_undefined', 'Player action undefined');
  }
}
