import { BaseOutput } from '../../../BaseOutput';

export interface PlayersCheckPayload {
  pokerTableName: string;
  selectedSeatNumber: number;
}

export interface PlayersCheckOutput extends BaseOutput {
  ok: boolean;
}

export enum PlayersCheckErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  NotActivePlayerError = 'player_not_active_player',
}
