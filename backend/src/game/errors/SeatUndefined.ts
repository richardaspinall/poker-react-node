import { BaseError } from '@infra/BaseError';

export class SeatUndefined extends BaseError {
  constructor() {
    super('SEAT_UNDEFINED', 'Seat undefined');
  }
}
