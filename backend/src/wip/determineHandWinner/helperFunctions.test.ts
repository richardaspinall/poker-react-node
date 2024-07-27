import { CardShortCode } from '@shared/game/types/CardShortCode';

import {
  checkForFlush,
  checkForStraight,
  combineHand,
  countRanks,
  getRanks,
  orderAndMapRanks,
} from './determineHandWinner';

describe('combineHand', () => {
  it('combines the hand', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
    ];
    const holeCards = [CardShortCode.AceOfClubs, CardShortCode.SixOfClubs];

    // Act
    const combinedHand = combineHand(holeCards, communityCards);

    // Assert
    expect(combinedHand.sort()).toStrictEqual(['2C', '3C', '4C', '5C', '6C', 'AC', 'KH'].sort());
  });
});

describe('getRanks', () => {
  it('gets the first character of each card', async () => {
    // Arrange
    const cards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfClubs,
    ];

    // Act
    const ranks = getRanks(cards).sort();

    // Assert
    const expectedRanks = ['2', '3', '4', '5', '6', 'A', 'K'].sort();
    expect(ranks).toStrictEqual(expectedRanks);
  });
});

describe('orderRanks', () => {
  it('maps to a number and orders', async () => {
    // Arrange
    const cards: string[] = ['2', '4', '3', 'K', 'A', '7', 'J'];

    // Act
    const ranks = orderAndMapRanks(cards);

    // Assert
    const expectedRanks = [2, 3, 4, 7, 11, 13, 14];
    expect(ranks).toStrictEqual(expectedRanks);
  });
});

describe('checkForFlush', () => {
  it('returns true for 5 clubs', async () => {
    // Arrange
    const cards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfClubs,
    ];

    // Act
    const flush = checkForFlush(cards);

    // Assert
    expect(flush).toBe(true);
  });

  it('returns false for no flush', async () => {
    // Arrange
    const cards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfHearts,
    ];

    // Act
    const flush = checkForFlush(cards);

    // Assert
    expect(flush).toBe(false);
  });
});

describe('checkForStraight', () => {
  it('returns true for 5 numbers in a row', async () => {
    // Arrange
    const cards: number[] = [2, 3, 4, 5, 6, 9, 10];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(true);
  });

  it('returns false for no 5 numbers in a row', async () => {
    // Arrange
    const cards: number[] = [2, 3, 5, 6, 9, 10, 11];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(false);
  });

  it('returns true for A(1) - 5', async () => {
    // Arrange
    const cards: number[] = [1, 2, 3, 4, 5, 6, 9];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(true);
  });

  it('returns true for 10 - A(14)', async () => {
    // Arrange
    const cards: number[] = [2, 3, 10, 11, 12, 13, 14];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(true);
  });
});

describe('countRanks', () => {
  it('returns a map with two 2s and two 4s', async () => {
    // Arrange
    const cards: number[] = [2, 2, 4, 4, 5, 6, 9, 10];

    // Act
    const rankCountMap = countRanks(cards);

    // Assert
    expect(rankCountMap[2]).toBe(2);
    expect(rankCountMap[3]).toBe(0);
    expect(rankCountMap[4]).toBe(2);
    expect(rankCountMap[5]).toBe(1);
    expect(rankCountMap[6]).toBe(1);
    expect(rankCountMap[7]).toBe(0);
    expect(rankCountMap[8]).toBe(0);
    expect(rankCountMap[9]).toBe(1);
    expect(rankCountMap[10]).toBe(1);
    expect(rankCountMap[11]).toBe(0);
    expect(rankCountMap[12]).toBe(0);
    expect(rankCountMap[13]).toBe(0);
    expect(rankCountMap[14]).toBe(0);
  });

  it('returns a map with three Aces (14) and two Kings (13)', async () => {
    // Arrange
    const cards: number[] = [2, 3, 7, 13, 13, 14, 14, 14];

    // Act
    const rankCountMap = countRanks(cards);

    // Assert
    expect(rankCountMap[2]).toBe(1);
    expect(rankCountMap[3]).toBe(1);
    expect(rankCountMap[4]).toBe(0);
    expect(rankCountMap[5]).toBe(0);
    expect(rankCountMap[6]).toBe(0);
    expect(rankCountMap[7]).toBe(1);
    expect(rankCountMap[8]).toBe(0);
    expect(rankCountMap[9]).toBe(0);
    expect(rankCountMap[10]).toBe(0);
    expect(rankCountMap[11]).toBe(0);
    expect(rankCountMap[12]).toBe(0);
    expect(rankCountMap[13]).toBe(2);
    expect(rankCountMap[14]).toBe(3);
  });
});
