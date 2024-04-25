import { BaseOutput } from '../../BaseOutput';

export interface PokerTableGetSeatsPayload {
  pokerTableName: string;
}

export interface PokerTableGetSeatsOutput extends BaseOutput {
  ok: boolean;
  seats: {
    seatNumber: string;
    username: string;
  }[];
}

export enum PokerTableGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist'
}

