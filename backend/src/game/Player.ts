import { Card } from '../shared/game/types/Card';
import { User } from '../users/User';

export class Player extends User {
  private cards: Card[] = [];
  private chipCount: number;
  private currentBet: number;

  constructor(userId: number, username: string) {
    super(userId, username);
    this.chipCount = 1000;
    this.currentBet = 0;
  }

  public setCards(cards: Card[]): void {
    this.cards = cards;
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public foldCards(): void {
    this.cards = [];
  }

  public getCurrentBet(): number {
    return this.currentBet;
  }

  public getChipCount(): number {
    return this.chipCount;
  }
}
