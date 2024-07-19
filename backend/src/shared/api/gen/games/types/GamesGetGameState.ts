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
    playersCurrentBets: {
      chipCount: number;
      currentBet: number;
      seatNumber: number;
    }[];
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
  PokerTableDoesNotExistError = 'POKER_TABLE_DOES_NOT_EXIST',
  GameStateDoesNotExistError = 'GAME_STATE_DOES_NOT_EXIST',
}
