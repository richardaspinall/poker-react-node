import { BaseError } from '@infra/BaseError';

export class SeatUndefinedError extends BaseError {
  constructor() {
    super('SEAT_UNDEFINED', 'Seat undefined');
  }
}
