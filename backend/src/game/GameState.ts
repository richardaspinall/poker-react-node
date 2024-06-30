import { Card } from '../shared/game/types/Card';

export enum Round {
  preFlop = 'pre-flop',
  flop = 'flop',
  turn = 'turn',
  river = 'river',
}

export type GameAction = 'initial' | 'fold' | 'check' | 'call' | 'bet' | 'raise';

/*
 * GameState is responsible for the state of a poker game
 */
export class GameState {
  private dealerPosition: number;
  private smallBlind: number;
  private bigBlind: number;
  private pot: number;
  private currentBet: number;
  private seatToAct: number;
  private roundState: Round;
  private communityCards: Card[];
  private gameAction: GameAction;
  private lastRaisedBy: number;

  constructor(dealerPosition: number, smallBlind: number, bigBlind: number) {
    this.dealerPosition = dealerPosition;
    this.smallBlind = smallBlind;
    this.bigBlind = bigBlind;

    this.pot = 0;
    this.currentBet = 0;
    this.seatToAct = 0;
    this.roundState = Round.preFlop;
    this.communityCards = [];
    this.gameAction = 'initial';
    this.lastRaisedBy = 0;
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

  public updateSeatToAct(seatToAct: number) {
    this.seatToAct = seatToAct;
  }

  public updateGameAction(gameAction: GameAction) {
    this.gameAction = gameAction;
  }

  public updateLastRaisedBy(lastRaisedBy: number) {
    this.lastRaisedBy = lastRaisedBy;
  }

  public getRound() {
    return this.roundState;
  }

  public updateRound(roundState: Round) {
    this.roundState = roundState;
  }

  public getDealerPosition() {
    return this.dealerPosition;
  }

  public getSmallBlind() {
    return this.smallBlind;
  }

  public getBigBlind() {
    return this.bigBlind;
  }

  public getPot() {
    return this.pot;
  }

  public getCurrentBet() {
    return this.currentBet;
  }

  public getSeatToAct() {
    return this.seatToAct;
  }

  public getCommunityCards() {
    return this.communityCards;
  }

  public getGameAction() {
    return this.gameAction;
  }

  public getLastRaisedBy() {
    return this.lastRaisedBy;
  }
}
