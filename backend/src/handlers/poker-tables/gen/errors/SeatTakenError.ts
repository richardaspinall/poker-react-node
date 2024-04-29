import { BaseError } from '@infra/BaseError';

export class SeatTakenError extends BaseError {
  constructor() {
    super('seat_taken', 'Seat is taken');
  }
}
