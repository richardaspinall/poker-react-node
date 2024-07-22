import { Card } from '../shared/game/types/Card';
import { User } from '../users/User';

export type PlayerAction = 'initial' | 'fold' | 'check' | 'call' | 'bet' | 'raise';

export class Player extends User {
  private cards: Card[] = [];
  private playerAction: PlayerAction;
  private chipCount: number;
  private currentBet: number;
  private hadTurn: boolean = false;

  constructor(userId: number, username: string) {
    super(userId, username);
    this.playerAction = 'initial';
    this.chipCount = 1000;
    this.currentBet = 0;
  }

  public setCards(cards: Card[]): void {
    this.cards = cards;
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public setCurrentBet(bet: number): void {
    this.currentBet = bet;
  }

  public setHadTurn(): void {
    this.hadTurn = true;
  }

  public hasHadTurn(): boolean {
    return this.hadTurn;
  }

  public foldCards(): void {
    this.cards = [];
  }

  public getCurrentBet(): number {
    return this.currentBet;
  }

  public getPlayerAction(): PlayerAction {
    return this.playerAction;
  }

  public setPlayerAction(playerAction: PlayerAction) {
    this.playerAction = playerAction;
  }

  public resetPlayer(): void {
    this.playerAction = 'initial';
    this.currentBet = 0;
    this.hadTurn = false;
  }

  public getChipCount(): number {
    return this.chipCount;
  }

  public setChipCount(chipCount: number): void {
    this.chipCount = chipCount;
  }

  public updateChipCount(amount: number): void {
    this.chipCount += amount;
  }
}
