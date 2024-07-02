import { BaseError } from '@infra/BaseError';

export class SeatTakenError extends BaseError {
  constructor() {
    super('SEAT_TAKEN', 'Seat is taken');
  }
}
