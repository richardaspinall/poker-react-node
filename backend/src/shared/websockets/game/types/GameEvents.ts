import { Card } from '../../../game/types/Card';

export enum GameEvent {
  START_GAME = 'start_game',
  DEAL_CARDS = 'deal_cards',
  FOLD_CARDS = 'fold_cards',
  SEAT_TO_ACT = 'seat_to_act',
  DEAL_COMMUNITY_CARDS = 'deal_community_cards',
  UPDATE_POT = 'update_pot',
  PLAYER_BET = 'player_bet',
  RESET_BETS = 'reset_bets',
}

export type StartGameEvent = {
  tableName: string;
};

export type DealCardsEvent = {
  cards: Card[];
};

export type FoldCardsEvent = {
  username: string;
  seatNumber: number;
};

export type SeatToActEvent = {
  seatToAct: number;
};

export type UpdatePotEvent = {
  pot: number;
};
export type PlayerBetEvent = {
  seatNumber: number;
  betAmount: number;
  chipCount: number;
};

export interface GameEvents {
  start_game: (payload: StartGameEvent) => void;
  deal_cards: (payload: DealCardsEvent) => void;
  fold_cards: (payload: FoldCardsEvent) => void;
  seat_to_act: (payload: SeatToActEvent) => void;
  deal_community_cards: (payload: DealCardsEvent) => void;
  update_pot: (payload: UpdatePotEvent) => void;
  player_bet: (payload: PlayerBetEvent) => void;
  reset_bets: () => void;
}
