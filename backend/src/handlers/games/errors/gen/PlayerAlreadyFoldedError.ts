import { BaseError } from '@infra/BaseError';

export class PlayerAlreadyFoldedError extends BaseError {
  constructor() {
    super('PLAYER_ALREADY_FOLDED', 'The Player has already folded');
  }
}
