import { BaseOutput } from '../../../BaseOutput';

export interface PlayersBetPayload {
  betAmount: number;
  pokerTableName: string;
  selectedSeatNumber: number;
}

export interface PlayersBetOutput extends BaseOutput {
  ok: boolean;
}

export enum PlayersBetErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  NotActivePlayerError = 'player_not_active_player',
}
