import { Card } from '../shared/game/types/Deck';

export enum Round {
  preFlop = 'pre-flop',
  flop = 'flop',
  turn = 'turn',
  river = 'river',
}

/*
 * GameState is responsible for the state of a poker game
 */
export class GameState {
  private dealerPosition: number;
  private smallBlind: number;
  private bigBlind: number;
  private pot: number;
  private currentBet: number;
  private playerToActIndex: number;
  private roundState: Round;
  private communityCards: Card[];

  constructor(dealerPosition: number, smallBlind: number, bigBlind: number) {
    this.dealerPosition = dealerPosition;
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;

    this.pot = 0;
    this.currentBet = 0;
    this.playerToActIndex = 0;
    this.roundState = Round.preFlop;
    this.communityCards = [];
  }

  // Methods to update the game state

  public updateCommunityCards(communityCards: Card[]) {
    this.communityCards = communityCards;
  }
  public updatePot(pot: number) {
    this.pot = pot;
  }
  public updateCurrentBet(currentBet: number) {
    this.currentBet = currentBet;
  }
  public updateCurrentPlayerIndex(playerToActIndex: number) {
    this.playerToActIndex = playerToActIndex;
  }

  public getRound() {
    return this.roundState;
  }
  public updateRound(roundState: Round) {
    this.roundState = roundState;
  }
}
