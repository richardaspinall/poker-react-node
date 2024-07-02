import { BaseOutput } from '../../../BaseOutput';

export interface GamesFoldPayload {
  pokerTableName: string;
}

export interface GamesFoldOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesFoldErrorCodes {
  PlayerAlreadyFoldedError = 'PLAYER_ALREADY_FOLDED',
  PlayerNotFoundAtTableError = 'PLAYER_NOT_FOUND_AT_TABLE',
  NotPlayersTurnError = 'NOT_PLAYERS_TURN',
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
  GameDoesNotExistError = 'GAME_DOES_NOT_EXIST',
}
