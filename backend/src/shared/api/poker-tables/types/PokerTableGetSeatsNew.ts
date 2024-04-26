import { BaseOutput } from '../../BaseOutput';

export interface PokerTableGetSeatsNewPayload {
  pokerTableName: string;
}

export interface PokerTableGetSeatsNewOutput extends BaseOutput {
  ok: boolean;
  seats: {
    seatNumber: string;
    username: string;
  }[];
}

export enum PokerTableGetSeatsNewErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist'
}

