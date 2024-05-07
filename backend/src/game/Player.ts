import { Card } from '../shared/game/types/Card';
import { User } from '../users/User';

export class Player extends User {
  private cards: Card[] = [];

  constructor(userId: number, username: string) {
    super(userId, username);
  }

  public setCards(cards: Card[]): void {
    this.cards = cards;
  }

  public getCards(): Card[] {
    return this.cards;
  }
}
