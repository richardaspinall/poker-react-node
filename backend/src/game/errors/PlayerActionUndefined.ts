import { BaseError } from '@infra/BaseError';

export class PlayerActionUndefined extends BaseError {
  constructor() {
    super('PLAYER_ACTION_UNDEFINED', 'Player action undefined');
  }
}
