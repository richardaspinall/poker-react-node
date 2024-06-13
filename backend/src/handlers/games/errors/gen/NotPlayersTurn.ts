import { BaseError } from '@infra/BaseError';

export class NotPlayersTurn extends BaseError {
  constructor() {
    super('not_players_turn', 'It is not your turn');
  }
}
