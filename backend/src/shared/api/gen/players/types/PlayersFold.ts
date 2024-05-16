import { BaseOutput } from '../../../BaseOutput';

export interface PlayersFoldPayload {
  pokerTableName: string;
  selectedSeatNumber: number;
}

export interface PlayersFoldOutput extends BaseOutput {
  ok: boolean;
}

export enum PlayersFoldErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  PlayerAlreadyFolded = 'player_already_folded',
}
