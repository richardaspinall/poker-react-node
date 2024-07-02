import { BaseError } from '@infra/BaseError';

export class GameStateDoesNotExistError extends BaseError {
  constructor() {
    super('GAME_STATE_DOES_NOT_EXIST', 'The game state does not exist');
  }
}
