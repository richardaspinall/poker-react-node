import { BaseOutput } from '../../BaseOutput';

export interface PokerTablesGetSeatsPayload extends BaseOutput {
  pokerTableName: string;
  seats: {
    seatNumber: string;
    username?: string;
  }[];
  seats: {
    seatNumber: string;
    username?: string;
  }[];
}

export interface PokerTablesGetSeatsOutput extends BaseOutput {
  alias?: string;
  isFull: boolean;
  pokerTableName: string;
  seats: {
    seatNumber: string;
    username?: string;
  }[];
  secondArray: {
    seats: {
      seatNumber: string;
      seats: {
        seatNumber: string;
        seats: {
          seatNumber: string;
          username?: string;
        }[];
      }[];
      username?: string;
    }[];
    username: string;
    usernumber?: number;
  }[];
}

export enum PokerTablesGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  InvalidRequestPayload = 'invalid_request_payload'
}

