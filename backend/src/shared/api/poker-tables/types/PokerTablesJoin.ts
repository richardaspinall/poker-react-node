import { BaseOutput } from '../../BaseOutput';

export interface PokerTablesJoinPayload {
  selectedSeatNumber: string;
}

export interface PokerTablesJoinOutput extends BaseOutput {
  ok: boolean;
}

export enum PokerTablesJoinErrorCodes {
  SeatTakenError = 'seat_taken',
  PlayerAlreadySeatedError = 'player_already_seated',
  PlayerNotFoundAtTableError = 'player_not_found_at_table',
}
