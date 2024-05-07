import { Suit } from '@shared/game/types/Suit';

import { Deck, createCardsInSuit } from './Deck';

describe('Deck', () => {
  describe('getCards', () => {
    it('returns 52 cards', async () => {
      const deck = new Deck();
      const cards = deck.getCards();

      expect(cards.length).toBe(52);
    });
  });

  describe('createCardsInSuit', () => {
    const expectedRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    describe('hearts', () => {
      const cards = createCardsInSuit(Suit.Hearts);
      it('has 13 cards', async () => {
        expect(cards.length).toBe(13);
      });

      it('has each rank', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].rank).toBe(expectedRanks[index]);
        }
      });

      it('has each shortCode', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].cardShortCode).toBe(expectedRanks[index] + Suit.Hearts[0]);
        }
      });
    });

    describe('clubs', () => {
      const cards = createCardsInSuit(Suit.Clubs);
      it('has 13 cards', async () => {
        expect(cards.length).toBe(13);
      });

      it('has each rank', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].rank).toBe(expectedRanks[index]);
        }
      });

      it('has each shortCode', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].cardShortCode).toBe(expectedRanks[index] + Suit.Clubs[0]);
        }
      });
    });

    describe('diamonds', () => {
      const cards = createCardsInSuit(Suit.Diamonds);
      it('has 13 cards', async () => {
        expect(cards.length).toBe(13);
      });

      it('has each rank', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].rank).toBe(expectedRanks[index]);
        }
      });

      it('has each shortCode', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].cardShortCode).toBe(expectedRanks[index] + Suit.Diamonds[0]);
        }
      });
    });

    describe('spades', () => {
      const cards = createCardsInSuit(Suit.Spades);
      it('has 13 cards', async () => {
        expect(cards.length).toBe(13);
      });

      it('has each rank', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].rank).toBe(expectedRanks[index]);
        }
      });

      it('has each shortCode', async () => {
        for (let index = 0; index < expectedRanks.length; index++) {
          expect(cards[index].cardShortCode).toBe(expectedRanks[index] + Suit.Spades[0]);
        }
      });
    });
  });

  describe('draw', () => {
    let deck = new Deck();

    beforeEach(() => {
      deck = new Deck();
    });

    describe('matching card', () => {
      const card = deck.draw(1)[0];
      it('in a new deck', async () => {
        const expectedDeck = new Deck();
        const expectedCards = expectedDeck.getCards();

        expect(expectedCards).toContainEqual(card);
      });

      it('with a suit property', async () => {
        expect(card).toHaveProperty('suit');
      });

      it('with a rank', async () => {
        expect(card).toHaveProperty('rank');
      });

      it('with a shortcode', async () => {
        expect(card).toHaveProperty('cardShortCode');
      });
    });

    it('draws 3 cards', async () => {
      const cards = deck.draw(3);

      expect(cards.length).toBe(3);
    });

    it('leaves 47 cards in the deck', async () => {
      deck.draw(5);

      expect(deck.getCards().length).toBe(47);
    });
  });
});
