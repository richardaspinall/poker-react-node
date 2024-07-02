import { BaseOutput } from '../../../BaseOutput';

export interface GamesGetGameStatePayload {
  pokerTableName: string;
}

export interface GamesGetGameStateOutput extends BaseOutput {
  ok: boolean;
  payload: {
    bigBlind: number;
    communityCards: {
      cardShortCode: string;
      rank: string;
      suit: string;
    }[];
    currentBet: number;
    dealerPosition: number;
    playersHoleCards: {
      cardShortCode: string;
      rank: string;
      suit: string;
    }[];
    pot: number;
    roundState: string;
    seatToAct: number;
    smallBlind: number;
  };
}

export enum GamesGetGameStateErrorCodes {
  PokerTableDoesNotExistError = 'poker_table_does_not_exist',
  GameStateDoesNotExistError = 'game_state_does_not_exist',
}
