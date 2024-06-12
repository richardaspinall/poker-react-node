import { BaseOutput } from '../../../BaseOutput';

export interface GamesFoldPayload {
  pokerTableName: string;
}

export interface GamesFoldOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesFoldErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  NotPlayersTurn = 'not_players_turn',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  PlayerAlreadyFolded = 'player_already_folded',
  GameDoesNotExist = 'game_does_not_exist',
}
