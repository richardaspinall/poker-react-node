import { BaseError } from '@Infra/Result';

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super('player_already_seated', 'Player is already seated at the table');
  }
}
