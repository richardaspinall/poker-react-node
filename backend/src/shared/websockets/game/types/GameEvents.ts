import { Card } from '../../../game/types/Card';

export enum GameEvent {
  START_GAME = 'start_game',
  DEAL_CARDS = 'deal_cards',
  FOLD_CARDS = 'fold_cards',
  SEAT_TO_ACT = 'seat_to_act',
  DEAL_COMMUNITY_CARDS = 'deal_community_cards',
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

export interface GameEvents {
  start_game: (payload: StartGameEvent) => void;
  deal_cards: (payload: DealCardsEvent) => void;
  fold_cards: (payload: FoldCardsEvent) => void;
  seat_to_act: (payload: SeatToActEvent) => void;
  deal_community_cards: (payload: DealCardsEvent) => void;
}
