import { BaseError } from '@infra/BaseError';

export class SeatActionInvalid extends BaseError {
  constructor() {
    super('seat_action_invalid', 'Seat action is invalid');
  }
}
