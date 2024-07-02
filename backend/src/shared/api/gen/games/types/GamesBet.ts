import { BaseOutput } from '../../../BaseOutput';

export interface GamesBetPayload {
  amount: number;
  pokerTableName: string;
}

export interface GamesBetOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesBetErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  NotPlayersTurn = 'not_players_turn',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  GameDoesNotExist = 'game_does_not_exist',
}
