import { BaseError } from '@infra/BaseError';

export class GameStateDoesNotExistError extends BaseError {
  constructor() {
    super('game_state_does_not_exist', 'The game state does not exist for the specified poker table.');
  }
}
