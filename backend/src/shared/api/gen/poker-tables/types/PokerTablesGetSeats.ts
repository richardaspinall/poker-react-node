import { BaseOutput } from '../../../BaseOutput';

export interface PokerTablesGetSeatsPayload {
  pokerTableName: string;
}

export interface PokerTablesGetSeatsOutput extends BaseOutput {
  ok: boolean;
  seats: {
    seatNumber: number;
    username: string;
  }[];
}

export enum PokerTablesGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
}
