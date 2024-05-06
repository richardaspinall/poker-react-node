import { Deck } from './Deck';
import { GameState } from './GameState';

export class Game {
  private deck: Deck;
  private gameState: GameState;

  constructor() {
    this.deck = new Deck();
    this.gameState = new GameState(0, 1, 2);
  }
}
