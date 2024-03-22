import { BaseError } from '@Infra/Result';

export class SeatTakenError extends BaseError {
  constructor() {
    super('seat_taken', 'Seat is taken');
  }
}
