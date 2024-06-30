import { BaseError } from '@infra/BaseError';

export class GameActionInvalid extends BaseError {
  constructor() {
    super('game_action_invalid', 'Game action is invalid');
  }
}
