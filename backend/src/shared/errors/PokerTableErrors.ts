import { BaseError } from '@shared/Result';

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super('PLAYER_ALREADY_SEATED', 'Player is already seated at the table');
  }
}
export class SeatTakenError extends BaseError {
  constructor() {
    super('SEAT_TAKEN', 'Seat is taken');
  }
}

export class SeatNotFoundError extends BaseError {
  constructor() {
    super('SEAT_NOT_FOUND', 'Seat not found');
  }
}

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super('PLAYER_NOT_FOUND_AT_TABLE', 'Player is not seated at the table');
  }
}
