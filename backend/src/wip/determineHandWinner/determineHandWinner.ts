import { CardShortCode } from '@shared/game/types/CardShortCode';

export type Player = {
  name: string;
  holeCards?: CardShortCode[];
  hand?: CardShortCode[];
  handType: PokerHand;
};

export enum PokerHand {
  StraightFlush = 'StraightFlush',
  FourOfAKind = 'FourOfAKind',
  FullHouse = ' FullHouse', // Take highest three cards and highest two cards
  Flush = 'Flush',
  Straight = 'Straight',
  ThreeOfAKind = 'ThreeOfAKind',
  ThreePair = 'ThreePair', // If three pair, take highest two and highest other card
  TwoPair = 'TwoPair',
  OnePair = 'OnePair',
  HighCard = 'HighCard',
}

type Suit = 'C' | 'D' | 'H' | 'S';

type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type RankSuitSplit = {
  rank: Rank;
  suit: Suit;
};

export type RankCountMap = Map<Rank, number>;

const rankOrder: { [key: string]: number } = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

export function determineHandWinner(players: Player[], communityCards: CardShortCode[]): Player[] {
  const winningPlayers: Player[] = [];

  // Determine the winning player(s) and add their full 5 card best hand to the player object
  // – player.hand = ['2C', '3C', '4C', '5C', '6C'];
  //
  // Add them to the winningPlayers array and return
  // – winningPlayers.push(player);

  /*
   * - Combine players hole cards with community cards (7 cards)
   * - Order the cards
   * - Check for flush (5 of same suit)
   * - Check for straight (5 in a row)
   * - Count each card (2 Aces, 3 Kings..)
   * - Check for full house
   *
   * After each of the checks, check off PlayerPokerHands
   */

  if (!players[0].holeCards || !players[1].holeCards) {
    throw new Error('One or more of the players dont have cards to check');
  }

  const combinedHandOne = combineHand(players[0].holeCards, communityCards);

  const handOneSplit = splitAndRankShortCode(combinedHandOne);

  const playersHand = checkHands(combinedHandOne, handOneSplit);
  return winningPlayers;
}

// TODO: maybe return the hand here too seeing we already should have it?
export function checkHands(combinedHand: CardShortCode[], handSplit: RankSuitSplit[]): PokerHand {
  const hasFlush = checkForFlush(combinedHand);
  const straight = checkForStraight(handSplit);

  if (hasFlush && straight) {
    const flush = getFlush(handSplit, hasFlush);
    const straightFlush = checkForStraightFlush(flush);

    if (straightFlush) {
      return PokerHand.StraightFlush;
    }
  }

  const handRankCount = countRanks(handSplit);

  const fourOfAKind = checkForFourOfAKind(handRankCount);
  if (fourOfAKind) {
    return PokerHand.FourOfAKind;
  }

  const fullHouse = checkForFullHouse(handRankCount);
  if (fullHouse) {
    return PokerHand.FullHouse;
  }

  if (hasFlush) {
    return PokerHand.Flush;
  }

  if (straight.hasStraight) {
    return PokerHand.Straight;
  }

  const threeOfAKind = checkForThreeOfAKind(handRankCount);
  if (threeOfAKind) {
    return PokerHand.ThreeOfAKind;
  }

  const twoPair = checkForTwoPair(handRankCount);
  if (twoPair) {
    return PokerHand.TwoPair;
  }

  const onePair = checkForOnePair(handRankCount);
  if (onePair) {
    return PokerHand.OnePair;
  }

  return PokerHand.HighCard;
}

// Combine players hole cards with community cards (7 cards)
export function combineHand(holeCards: CardShortCode[], communityCards: CardShortCode[]): CardShortCode[] {
  return [...holeCards, ...communityCards];
}

// Need to split '2C' so we can work and use logic against each character (`'2', 'C'`)
export function splitAndRankShortCode(cards: CardShortCode[]): RankSuitSplit[] {
  const rankSuitSplit: RankSuitSplit[] = [];

  cards.forEach((card) => {
    rankSuitSplit.push({ rank: rankOrder[card.charAt(0)] as Rank, suit: card.charAt(1) as Suit });
  });

  rankSuitSplit.sort((a, b) => a.rank - b.rank);

  return rankSuitSplit;
}

// TODO: should return the highest flush
export function checkForFlush(cards: CardShortCode[]): Suit | undefined {
  const suitsCount = {
    C: 0,
    D: 0,
    H: 0,
    S: 0,
  };

  cards.forEach((card) => {
    const rank = card.charAt(1) as Suit;
    switch (rank) {
      case 'C':
        suitsCount.C += 1;
        break;
      case 'D':
        suitsCount.D += 1;
        break;
      case 'H':
        suitsCount.H += 1;
        break;
      case 'S':
        suitsCount.S += 1;
        break;
    }
  });

  let suitWithFiveOrMore: Suit | undefined = undefined;
  Object.entries(suitsCount).forEach(([suit, count]) => {
    if (count >= 5) {
      suitWithFiveOrMore = suit as Suit;
    }
  });
  return suitWithFiveOrMore;
}

export function checkForStraightFlush(flush: RankSuitSplit[]): boolean {
  const straight = checkForStraight(flush);

  const isStraightFlush = straight.hasStraight;

  return isStraightFlush;
}

export function getFlush(rankSuitSplit: RankSuitSplit[], suit: Suit): RankSuitSplit[] {
  const flush: RankSuitSplit[] = [];

  rankSuitSplit.forEach((card) => {
    if (card.suit === suit) {
      flush.push(card);
    }
  });

  return flush;
}

export function getHighCards(cards: RankSuitSplit[]): RankSuitSplit[] {
  if (cards.length === 6) {
    return cards.splice(1, 6);
  }
  if (cards.length === 7) {
    return cards.splice(2, 7);
  }

  return cards;
}

// TODO: should return the highest straight
export function checkForStraight(rankSuitSplit: RankSuitSplit[]): { hasStraight: boolean; straight?: RankSuitSplit[] } {
  // 1234589 return true
  // 1245689 return false
  // 1256789 return true
  // 1234678 return false
  //
  // A = 0 or 14
  //

  let count = 1;
  let hasStraight = false;
  rankSuitSplit.sort((a, b) => a.rank - b.rank); // ensure its  been sorted

  const straight: RankSuitSplit[] = [];

  for (let index = 0; index < rankSuitSplit.length; index++) {
    const element = rankSuitSplit[index];
    const nextElement = rankSuitSplit[index + 1];

    // We have got our straight and it's not possible to have higher straight
    if (hasStraight && element.rank + 1 != nextElement?.rank) {
      straight.push(element);

      if (straight.length === 6) {
        straight.splice(0, 1);
      }
      if (straight.length === 7) {
        straight.splice(0, 2);
      }
      return { hasStraight, straight };
    }

    if (element.rank + 1 === nextElement?.rank) {
      count += 1;
      straight.push(element);
    } else {
      count = 1;

      if (!hasStraight) {
        straight.length = 0;

        // TODO: maybe unnecessary: don't continue if index is 2 or greater and we have a count of 0 and they don't have a straight already
        if (index >= 2) {
          return { hasStraight, straight };
        }
      }
    }

    if (count >= 5) {
      hasStraight = true;
    }
  }

  return { hasStraight, straight };
}

// Count each rank
export function countRanks(rankSuitSplit: RankSuitSplit[]): RankCountMap {
  const rankCountMap: RankCountMap = new Map([
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
    [10, 0],
    [11, 0],
    [12, 0],
    [13, 0],
    [14, 0],
  ]);

  rankSuitSplit.forEach((rankSuit) => {
    const currentRankValue = rankCountMap.get(rankSuit.rank);
    if (currentRankValue != undefined) {
      rankCountMap.set(rankSuit.rank, currentRankValue + 1);
    }
  });

  return rankCountMap;
}

// TODO: add unit test
export function checkForFullHouse(rankCountMap: RankCountMap): boolean {
  let hasThreeOfAKind: boolean = false;
  rankCountMap.forEach((value) => {
    if (value === 3) {
      hasThreeOfAKind = true;
    }
  });

  let hasPair: boolean = false;
  rankCountMap.forEach((value) => {
    if (value === 2) {
      hasPair = true;
    }
  });

  return hasThreeOfAKind && hasPair;
}

export function getFullHouse(rankCountMap: RankCountMap) {
  let highestThreeOfAKind: Rank | undefined = undefined;
  let highestPair: Rank | undefined = undefined;

  rankCountMap.forEach((value, key) => {
    if (value === 3) {
      highestThreeOfAKind = key;
    }

    if (value === 2) {
      highestPair = key;
    }
  });

  const fullHouse = {
    threeOfAKind: highestThreeOfAKind,
    pair: highestPair,
  };

  return fullHouse;
}

// TODO: add unit test
export function checkForFourOfAKind(rankCountMap: RankCountMap): boolean {
  let hasFourOfAKind = false;
  rankCountMap.forEach((value) => {
    if (value === 4) {
      hasFourOfAKind = true;
    }
  });

  return hasFourOfAKind;
}

// TODO: add unit test
export function checkForThreeOfAKind(rankCountMap: RankCountMap): boolean {
  let hasThreeOfAKind = false;
  rankCountMap.forEach((value) => {
    if (value === 3) {
      hasThreeOfAKind = true;
    }
  });

  return hasThreeOfAKind;
}

// TODO: add unit test
export function checkForTwoPair(rankCountMap: RankCountMap): boolean {
  const pairs: Rank[] = [];

  rankCountMap.forEach((value, key) => {
    if (value === 2) {
      pairs.push(key);
    }
  });

  if (pairs.length >= 2) {
    return true;
  }

  return false;
}

// TODO: add unit test
export function checkForOnePair(rankCountMap: RankCountMap): boolean {
  const pairs: Rank[] = [];

  rankCountMap.forEach((value, key) => {
    if (value === 2) {
      pairs.push(key);
    }
  });

  if (pairs.length === 1) {
    return true;
  }

  return false;
}

type HandWinnersOnComparedStrength = {
  hand1: {
    hasWon: boolean;
  };
  hand2: {
    hasWon: boolean;
  };
};

export function compareHandStrengthHighCards(
  hand1: RankSuitSplit[],
  hand2: RankSuitSplit[],
): HandWinnersOnComparedStrength {
  if (hand1.length !== hand2.length) {
    throw new Error('Both sets must have the same length');
  }

  // Reverse the sets
  const reversedHand1 = hand1.reverse();
  const reversedHand2 = hand2.reverse();

  for (let i = 0; i < reversedHand1.length; i++) {
    if (reversedHand1[i].rank > reversedHand2[i].rank) {
      return { hand1: { hasWon: true }, hand2: { hasWon: false } };
    } else if (reversedHand1[i].rank < reversedHand2[i].rank) {
      return { hand1: { hasWon: false }, hand2: { hasWon: true } };
    }
  }

  // If all elements are equal
  return { hand1: { hasWon: true }, hand2: { hasWon: true } };
}

// TODO: not sure if we need these
export function orderAndMapRanks(ranks: string[]): number[] {
  const ranksMappedToNumbers: number[] = [];

  ranks.forEach((rank) => {
    ranksMappedToNumbers.push(rankOrder[rank]);
  });

  return ranksMappedToNumbers.sort((a, b) => a - b);
}
