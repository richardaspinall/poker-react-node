import { BaseOutput } from '../../../BaseOutput';

export interface GamesBetPayload {
  amount: number;
  pokerTableName: string;
}

export interface GamesBetOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesBetErrorCodes {
  PlayerNotFoundAtTableError = 'PLAYER_NOT_FOUND_AT_TABLE',
  NotPlayersTurnError = 'NOT_PLAYERS_TURN',
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
  GameDoesNotExistError = 'GAME_DOES_NOT_EXIST',
}
