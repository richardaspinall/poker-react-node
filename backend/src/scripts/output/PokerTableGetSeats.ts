import { BaseOutput } from '../../BaseOutput';

export interface PokerTableGetSeatsPayload {
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
  }[];
}

export enum PokerTableGetSeatsErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  InvalidRequestPayload = 'invalid_request_payload',
}
