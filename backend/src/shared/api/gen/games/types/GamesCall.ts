import { BaseOutput } from '../../../BaseOutput';

export interface GamesCallPayload {
  pokerTableName: string;
}

export interface GamesCallOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesCallErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  NotPlayersTurn = 'not_players_turn',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  GameDoesNotExist = 'game_does_not_exist',
}
