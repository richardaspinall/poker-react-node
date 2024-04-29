import { BaseOutput } from '../../../BaseOutput';

export interface PokerTablesGetSeatsPayload {
  pokerTableName: string;
}

export interface PokerTablesGetSeatsOutput extends BaseOutput {
  ok: boolean;
  seats: {
    seatNumber: string;
    username: string;
  }[];
}

export enum PokerTablesGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
}
