type ShortCode = string;

interface IDeck {
  draw(amount: number): Card[];
}

export type Card = {
  suit: Suit;
  rank: string;
  shortCode: ShortCode;
};

export enum Suit {
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Hearts = 'Hearts',
  Spades = 'Spades',
}

export default class Deck implements IDeck {
  private cards: Card[];

  constructor() {
    const cards: Card[] = [];
    const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades];

    for (const suit of suits) {
      cards.push(...createCardsInSuit(suit));
    }

    this.cards = cards;
    this.shuffle();
  }

  private shuffle(): void {
    for (let index = 0; index < this.cards.length; index++) {
      // Get a random index from 0 - 51 (52 cards)
      const randomIndex = Math.floor(Math.random() * 52);
      // Save a reference to the card currently at the index
      const tempCard = this.cards[randomIndex];
      // Swap the cards
      this.cards[randomIndex] = this.cards[index];
      this.cards[index] = tempCard;
    }
  }

  public draw(amount: number): Card[] {
    const drawnCards: Card[] = [];

    for (let index = 0; index < amount; index++) {
      const card = this.cards.pop();

      if (!card) {
        throw new Error('No more cards in deck');
      }

      drawnCards.push(card);
    }

    return drawnCards;
  }

  public getCards() {
    return this.cards;
  }
}

// Helper functions
export function createCardsInSuit(suit: Suit): Card[] {
  const result: Card[] = [];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  // `suit[0] is the first letter of the suit
  for (const rank of ranks) {
    const shortCode = `${rank}${suit[0]}`;
    result.push({ suit: suit, rank: rank, shortCode });
  }

  return result;
}
