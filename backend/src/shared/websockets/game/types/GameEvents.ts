import { Card } from '../../../game/types/Card';

export enum GameEvent {
  START_GAME = 'start_game',
  DEAL_CARDS = 'deal_cards',
  SEAT_TO_ACT = 'seat_to_act',
}

export type StartGameEvent = {
  tableName: string;
};

export type DealCardsEvent = {
  cards: Card[];
};

export interface GameEvents {
  start_game: (payload: StartGameEvent) => void;
  deal_cards: (payload: DealCardsEvent) => void;
  seat_to_act: (payload: { seatToAct: number }) => void;
}
