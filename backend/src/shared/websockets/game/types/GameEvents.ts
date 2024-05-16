import { Card } from '../../../game/types/Card';

export enum GameEvent {
  START_GAME = 'start_game',
  END_GAME = 'end_game',
  DEAL_CARDS = 'deal_cards',
  SEAT_TO_ACT = 'seat_to_act',
  PLAYER_FOLDED = 'player_folded',
}

export type StartGameEvent = {
  tableName: string;
};

export type EndGameEvent = {
  tableName: string;
};

export type DealCardsEvent = {
  cards: Card[];
};

export type SeatToActEvent = {
  seatToAct: number;
};

export type PlayerFoldedEvent = {
  username: string;
  seatNumber: number;
};

export interface GameEvents {
  start_game: (payload: StartGameEvent) => void;
  end_game: (payload: EndGameEvent) => void;
  deal_cards: (payload: DealCardsEvent) => void;
  seat_to_act: (payload: SeatToActEvent) => void;
  player_folded: (payload: PlayerFoldedEvent) => void;
}
