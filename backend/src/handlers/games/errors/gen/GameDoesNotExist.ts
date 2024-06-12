import { BaseError } from '@infra/BaseError';

export class GameDoesNotExist extends BaseError {
  constructor() {
    super('game_does_not_exist', 'Game does not exist');
  }
}
