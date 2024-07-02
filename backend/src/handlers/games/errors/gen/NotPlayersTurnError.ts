import { BaseError } from '@infra/BaseError';

export class NotPlayersTurnError extends BaseError {
  constructor() {
    super('NOT_PLAYERS_TURN', 'It is not the players turn');
  }
}
