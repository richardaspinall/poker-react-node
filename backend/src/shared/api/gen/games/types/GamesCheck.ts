import { BaseOutput } from '../../../BaseOutput';

export interface GamesCheckPayload {
  pokerTableName: string;
}

export interface GamesCheckOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesCheckErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  NotActivePlayerError = 'player_not_active_player',
}
