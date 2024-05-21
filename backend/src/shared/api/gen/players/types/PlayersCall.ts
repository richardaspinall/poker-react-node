import { BaseOutput } from '../../../BaseOutput';

export interface PlayersCallPayload {
  pokerTableName: string;
  selectedSeatNumber: number;
}

export interface PlayersCallOutput extends BaseOutput {
  ok: boolean;
}

export enum PlayersCallErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  NotActivePlayerError = 'player_not_active_player',
}
