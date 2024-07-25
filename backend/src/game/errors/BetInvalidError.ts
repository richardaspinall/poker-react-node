import { BaseError } from '@infra/BaseError';

export class BetInvalidError extends BaseError {
  constructor() {
    super('BET_INVALID', 'Player bet is invalid');
  }
}
