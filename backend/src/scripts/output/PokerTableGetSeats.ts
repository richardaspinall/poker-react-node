import { BaseOutput } from '../../BaseOutput';

export interface PokerTableGetSeatsPayload {
  seats: {
    seatNumber: string;
    username?: string;
  }[];
  pokerTableName: string;
  seats: {
    seatNumber: string;
    username?: string;
  }[];
}

export interface PokerTableGetSeatsOutput extends BaseOutput {
  pokerTableName: string;
  alias?: string;
  isFull: boolean;
  seats: {
    seatNumber: string;
    username?: string;
  }[];
  secondArray: {
    username: string;
    usernumber?: number;
    seats: {
      seatNumber: string;
      username?: string;
      seats: {
        seatNumber: string;
        seats: {
          seatNumber: string;
          username?: string;
        }[];
      }[];
    }[];
  }[];
}

export enum PokerTableGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  InvalidRequestPayload = 'invalid_request_payload'
}

