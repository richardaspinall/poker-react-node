import { BaseError } from '@infra/BaseError';

export class SeatNotFoundError extends BaseError {
  constructor() {
    super('SEAT_NOT_FOUND', 'Seat not found');
  }
}
