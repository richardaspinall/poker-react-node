import { BaseOutput } from '../../../BaseOutput';

export interface GamesFoldPayload {
  pokerTableName: string;
  selectedSeatNumber: number;
}

export interface GamesFoldOutput extends BaseOutput {
  ok: boolean;
}

export enum GamesFoldErrorCodes {
  PlayerNotFoundAtTableError = 'player_not_found_at_poker_table',
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  PlayerAlreadyFolded = 'player_already_folded',
}
