import { BaseError } from '@infra/BaseError';

export class GameDoesNotExistError extends BaseError {
  constructor() {
    super('GAME_DOES_NOT_EXIST', 'The game does not exist');
  }
}
