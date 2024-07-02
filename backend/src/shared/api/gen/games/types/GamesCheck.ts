import { BaseOutput } from '../../../BaseOutput';

export interface GamesCheckPayload {
  pokerTableName: string;
}

export interface GamesCheckOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesCheckErrorCodes {
  PlayerNotFoundAtTableError = 'PLAYER_NOT_FOUND_AT_TABLE',
  NotPlayersTurnError = 'NOT_PLAYERS_TURN',
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
  GameDoesNotExistError = 'GAME_DOES_NOT_EXIST',
}
