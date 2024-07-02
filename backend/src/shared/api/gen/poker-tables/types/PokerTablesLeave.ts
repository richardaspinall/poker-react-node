import { BaseOutput } from '../../../BaseOutput';

export interface PokerTablesLeavePayload {
  selectedSeatNumber: number;
}

export interface PokerTablesLeaveOutput extends BaseOutput {
  ok: boolean;
}

export enum PokerTablesLeaveErrorCodes {
  PlayerNotFoundAtTableError = 'PLAYER_NOT_FOUND_AT_TABLE',
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
}
