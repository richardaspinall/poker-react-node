import { BaseOutput } from '../../../BaseOutput';

export interface GamesCallPayload {
  pokerTableName: string;
  selectedSeatNumber: number;
}

export interface GamesCallOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesCallErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  NotActivePlayerError = 'player_not_active_player',
}
