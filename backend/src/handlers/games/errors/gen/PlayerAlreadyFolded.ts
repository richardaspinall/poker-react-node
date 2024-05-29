import { BaseError } from '@infra/BaseError';

export class PlayerAlreadyFolded extends BaseError {
  constructor() {
    super('player_already_folded', 'Player already folded');
  }
}
