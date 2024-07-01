import { BaseError } from '@infra/BaseError';

export class SeatUndefined extends BaseError {
  constructor() {
    super('seat_undefined', 'Seat undefined');
  }
}
