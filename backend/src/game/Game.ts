import { Deck } from './Deck';
import { GameState } from './GameState';
import { Round } from './GameState';

export class Game {
  private deck: Deck;
  private gameState: GameState;

  constructor(dealerPosition: number, smallBlind: number, bigBlind: number) {
    this.deck = new Deck();
    this.gameState = new GameState(dealerPosition, smallBlind, bigBlind);
  }

  public getDeck() {
    return this.deck;
  }

  public getGameState() {
    return this.gameState;
  }

  public startNextRound() {
    const round = this.gameState.getRound();
    switch (round) {
      case Round.preFlop:
        this.gameState.updateRound(Round.flop);
        break;
      case Round.flop:
        this.gameState.updateRound(Round.turn);
        break;
      case Round.turn:
        this.gameState.updateRound(Round.river);
        break;
    }
  }
}
