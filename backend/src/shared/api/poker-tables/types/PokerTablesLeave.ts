import { BaseOutput } from '../../BaseOutput';

export interface PokerTablesLeavePayload {
  selectedSeatNumber: string;
}

export interface PokerTablesLeaveOutput extends BaseOutput {
  ok: boolean;
}

export enum PokerTablesLeaveErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_table',
  PokerTableDoesNotExistError = 'pokertable_does_not_exist',
}
