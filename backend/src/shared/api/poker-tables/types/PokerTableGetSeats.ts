import { BaseOutput } from '../../BaseOutput';

export type PokerTableGetSeatsPayload = {
  pokerTableName: string;
};

export interface PokerTableGetSeatsOutput extends BaseOutput {
  seats: {
    seatNumber: string;
    username: string;
  }[];
}

// TODO: rename table to poker_table
export enum PokerTableGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'table_does_not_exist',
}
