import { BaseOutput } from '../../../BaseOutput';

export interface PokerTablesJoinPayload {
  selectedSeatNumber: number;
}

export interface PokerTablesJoinOutput extends BaseOutput {
  ok: boolean;
}

export enum PokerTablesJoinErrorCodes {
  SeatTakenError = 'SEAT_TAKEN',
  PlayerAlreadySeatedError = 'PLAYER_ALREADY_SEATED',
  PlayerNotFoundAtTableError = 'PLAYER_NOT_FOUND_AT_TABLE',
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
}
