import { Card } from '../shared/game/types/Card';
import { User } from '../users/User';

export type PlayerAction = 'initial' | 'fold' | 'check' | 'call' | 'bet' | 'raise';

export class Player extends User {
  private cards: Card[] = [];
  private playerAction: PlayerAction;

  constructor(userId: number, username: string) {
    super(userId, username);
    this.playerAction = 'initial';
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

  public getPlayerAction(): PlayerAction {
    return this.playerAction;
  }

  public updatePlayerAction(playerAction: PlayerAction) {
    this.playerAction = playerAction;
  }
}
