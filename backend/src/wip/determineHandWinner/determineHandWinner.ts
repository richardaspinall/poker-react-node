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
  FullHouse = 'FullHouse', // Take highest three cards and highest two cards
  Flush = 'Flush',
  Straight = 'Straight',
  ThreeOfAKind = 'ThreeOfAKind',
  TwoPair = 'TwoPair',
  OnePair = 'OnePair',
  HighCard = 'HighCard',
}

const PokerHandOrder: Map<PokerHand, number> = new Map([
  [PokerHand.HighCard, 0],
  [PokerHand.OnePair, 1],
  [PokerHand.TwoPair, 2],
  [PokerHand.ThreeOfAKind, 3],
  [PokerHand.Straight, 4],
  [PokerHand.Flush, 5],
  [PokerHand.FullHouse, 6],
  [PokerHand.FourOfAKind, 7],
  [PokerHand.StraightFlush, 8],
]);

type Suit = 'C' | 'D' | 'H' | 'S';

type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

const rankLookup: { [key in Rank]: string } = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

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

type HandWinnersOnComparedStrength = {
  hand1: {
    hasWon: boolean;
  };
  hand2: {
    hasWon: boolean;
  };
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

  const handOneCombined = combineHand(players[0].holeCards, communityCards);
  const handOneSplit = splitAndRankShortCode(handOneCombined);

  const handTwoCombined = combineHand(players[1].holeCards, communityCards);
  const handTwoSplit = splitAndRankShortCode(handTwoCombined);

  const player1Hand = checkHands(handOneCombined, handOneSplit);
  const player2Hand = checkHands(handTwoCombined, handTwoSplit);

  const player1HandRank = PokerHandOrder.get(player1Hand) as number;
  const player2HandRank = PokerHandOrder.get(player2Hand) as number;

  let winner: HandWinnersOnComparedStrength = {
    hand1: {
      hasWon: false,
    },
    hand2: {
      hasWon: false,
    },
  };
  const p1hand = getShortCodes(handOneCombined, handOneSplit, player1Hand);
  const p2hand = getShortCodes(handTwoCombined, handTwoSplit, player2Hand);

  if (player1HandRank > player2HandRank) {
    winningPlayers.push({ name: players[0].name, handType: player1Hand, hand: p1hand });
  } else if (player1HandRank < player2HandRank) {
    winningPlayers.push({ name: players[1].name, handType: player2Hand, hand: p2hand });
  } else {
    switch (player1Hand) {
      case 'StraightFlush':
      case 'Straight':
        winner = compareHandStrengthHighCards(
          checkForStraight(handOneSplit).straight!,
          checkForStraight(handTwoSplit).straight!,
        );
        break;
      case 'Flush':
      case 'HighCard':
        winner = compareHandStrengthHighCards(handOneSplit, handTwoSplit);
        break;
      case 'FourOfAKind':
        winner = compareHandStrengthWhenMultiples(
          countRanks(handOneSplit),
          countRanks(handTwoSplit),
          PokerHand.FourOfAKind,
        );
        break;
      case 'FullHouse':
        winner = compareHandStrengthWhenMultiples(
          countRanks(handOneSplit),
          countRanks(handTwoSplit),
          PokerHand.FullHouse,
        );
        break;
      case 'ThreeOfAKind':
        winner = compareHandStrengthWhenMultiples(
          countRanks(handOneSplit),
          countRanks(handTwoSplit),
          PokerHand.ThreeOfAKind,
        );
        break;
      case 'TwoPair':
        winner = compareHandStrengthWhenMultiples(
          countRanks(handOneSplit),
          countRanks(handTwoSplit),
          PokerHand.TwoPair,
        );
        break;
      case 'OnePair':
        winner = compareHandStrengthWhenMultiples(
          countRanks(handOneSplit),
          countRanks(handTwoSplit),
          PokerHand.OnePair,
        );
        break;
    }

    if (winner.hand1.hasWon) {
      winningPlayers.push({ name: players[0].name, handType: player1Hand, hand: p1hand });
    }

    if (winner.hand2.hasWon) {
      winningPlayers.push({ name: players[1].name, handType: player2Hand, hand: p2hand });
    }
  }

  // Get cards
  //
  // TODO: currently they are all returned in different formats so we need to either make
  // TODO: them consistent or be able to convert them.
  // TODO:
  // TODO: for now to make it work, maybe we just convert them one at a time, then make it flex and right
  // TODO: later
  //
  //
  //
  // Flush
  // - getFlush -> getHighCards
  //
  // Straight
  // - checkForStraight -> .straight
  //
  // Straight flush
  //
  // - getFlush -> checkForStraight -> .straight
  //
  // Fullhouse
  //
  // getFullHouse

  return winningPlayers;
}

export function getShortCodes(
  combinedHand: CardShortCode[],
  handOneSplit: RankSuitSplit[],
  handType: PokerHand,
): CardShortCode[] {
  const fiveCardswinningHand: CardShortCode[] = [];
  const rankCountMap = countRanks(handOneSplit);

  switch (handType) {
    case 'StraightFlush': {
      const suit = checkForFlush(combinedHand);

      if (suit) {
        const flush = getFlush(handOneSplit, suit!);
        const straight = checkForStraight(flush).straight;

        straight?.forEach((card) => {
          const rank: string = rankLookup[card.rank];

          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        });
      } else {
        throw new Error('checkForStraightFlush failed');
      }
      break;
    }
    case 'Straight': {
      const straight = checkForStraight(handOneSplit).straight;

      straight?.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
      });
      break;
    }
    case 'Flush': {
      const suit = checkForFlush(combinedHand);

      if (suit) {
        const flush = getFlush(handOneSplit, suit!);

        flush.forEach((card) => {
          const rank: string = rankLookup[card.rank];

          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        });
      } else {
        throw new Error('checkForFlush failed');
      }

      break;
    }
    case 'FourOfAKind': {
      const fourOfAKind = getFourOfAKind(rankCountMap);

      handOneSplit.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        if (card.rank === fourOfAKind.fourOfAKind) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === fourOfAKind.highestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }
      });
      break;
    }
    case 'FullHouse': {
      const fullHouse = getFullHouse(rankCountMap);

      handOneSplit.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        if (card.rank === fullHouse.threeOfAKind) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === fullHouse.pair) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }
      });
      break;
    }
    case 'ThreeOfAKind': {
      const threeOfAKind = getThreeOfAKind(rankCountMap);

      handOneSplit.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        if (card.rank === threeOfAKind.threeOfAKind) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === threeOfAKind.highestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === threeOfAKind.secondHighestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }
      });
      break;
    }
    case 'TwoPair': {
      const twoPair = getTwoPair(rankCountMap);

      handOneSplit.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        if (card.rank === twoPair.highestPair) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === twoPair.secondHighestPair) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === twoPair.highestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }
      });
      break;
    }
    case 'OnePair': {
      const onePair = getOnePair(rankCountMap);

      handOneSplit.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        if (card.rank === onePair.highestPair) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === onePair.highestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === onePair.secondHighestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }

        if (card.rank === onePair.thirdHighestCard) {
          fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
        }
      });
      break;
    }
    case 'HighCard': {
      const highCards = getHighCards(handOneSplit);

      highCards.forEach((card) => {
        const rank: string = rankLookup[card.rank];

        fiveCardswinningHand.push((rank + card.suit) as CardShortCode);
      });
      break;
    }
  }

  return fiveCardswinningHand;
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
    // TODO: fix take care of the tens: 10C etc
    if (card.charAt(0) === '1' && card.charAt(1) === '0') {
      rankSuitSplit.push({ rank: rankOrder[card.charAt(0) + card.charAt(1)] as Rank, suit: card.charAt(2) as Suit });
    } else {
      rankSuitSplit.push({ rank: rankOrder[card.charAt(0)] as Rank, suit: card.charAt(1) as Suit });
    }
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

  let rank: Suit | undefined = undefined;
  cards.forEach((card) => {
    // TODO: fix take care of the tens: 10C etc
    if (card.charAt(0) === '1' && card.charAt(1) === '0') {
      rank = card.charAt(2) as Suit;
    } else {
      rank = card.charAt(1) as Suit;
    }
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

export function getFlush(rankSuitSplit: RankSuitSplit[], suit: Suit): RankSuitSplit[] {
  const flush: RankSuitSplit[] = [];

  rankSuitSplit.forEach((card) => {
    if (card.suit === suit) {
      flush.push(card);
    }
  });

  return flush;
}

export function checkForStraightFlush(flush: RankSuitSplit[]): boolean {
  const straight = checkForStraight(flush);

  const isStraightFlush = straight.hasStraight;

  return isStraightFlush;
}

export function getHighCards(cards: RankSuitSplit[]): RankSuitSplit[] {
  cards.sort((a, b) => b.rank - a.rank);

  return cards.slice(0, 5);
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
export function getFourOfAKind(rankCountMap: RankCountMap) {
  let highestFourOfAKind: Rank | undefined = undefined;
  let highestCard: Rank | undefined = undefined;

  rankCountMap.forEach((value, key) => {
    if (value === 4) {
      highestFourOfAKind = key;
    }

    if (value === 1) {
      highestCard = key;
    }
  });

  const fourOfAKind = {
    fourOfAKind: highestFourOfAKind,
    highestCard: highestCard,
  };

  return fourOfAKind;
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
export function getThreeOfAKind(rankCountMap: RankCountMap) {
  let highestThreeOfAKind: Rank | undefined = undefined;
  const otherCards: Rank[] = [];

  // TODO: must be a better way to do this but it will do for now
  rankCountMap.forEach((value, key) => {
    if (value === 3) {
      highestThreeOfAKind = key;
    } else if (value === 1) {
      otherCards.push(key);
    }
  });

  otherCards.sort((a, b) => b - a);
  const highestCard = otherCards[0];
  const secondHighestCard = otherCards[1];

  const threeOfAKind = {
    threeOfAKind: highestThreeOfAKind,
    highestCard: highestCard,
    secondHighestCard: secondHighestCard,
  };

  return threeOfAKind;
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
export function getTwoPair(rankCountMap: RankCountMap) {
  const highestPairs: Rank[] = [];
  let highestCard: Rank | undefined = undefined;

  // TODO: must be a better way to do this but it will do for now
  rankCountMap.forEach((value, key) => {
    if (value === 2) {
      highestPairs.push(key);
    }

    if (value === 2 && highestPair != undefined) {
      highestCard = key;
    }

    if (value === 1) {
      highestCard = key;
    }
  });

  highestPairs.sort((a, b) => b - a);
  const highestPair = highestPairs[0];
  const secondHighestPair = highestPairs[1];

  const twoPair = {
    highestPair: highestPair,
    secondHighestPair: secondHighestPair,
    highestCard: highestCard,
  };

  return twoPair;
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

// TODO: add unit test
export function getOnePair(rankCountMap: RankCountMap) {
  let highestPair: Rank | undefined = undefined;
  const otherCards: Rank[] = [];

  // TODO: must be a better way to do this but it will do for now
  rankCountMap.forEach((value, key) => {
    if (value === 2) {
      highestPair = key;
    }

    if (value === 1) {
      otherCards.push(key);
    }
  });

  otherCards.sort((a, b) => b - a);
  const highestCard = otherCards[0];
  const secondHighestCard = otherCards[1];
  const thirdHighestCard = otherCards[2];

  const pair = {
    highestPair: highestPair,
    highestCard: highestCard,
    secondHighestCard: secondHighestCard,
    thirdHighestCard: thirdHighestCard,
  };

  return pair;
}

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

export function compareHandStrengthWhenMultiples(
  hand1: RankCountMap,
  hand2: RankCountMap,
  handType: PokerHand,
): HandWinnersOnComparedStrength {
  switch (handType) {
    case 'FullHouse': {
      const hand1FullHouse = getFullHouse(hand1);
      const hand2FullHouse = getFullHouse(hand2);
      if (hand1FullHouse.threeOfAKind && hand2FullHouse.threeOfAKind) {
        if (hand1FullHouse.threeOfAKind > hand2FullHouse.threeOfAKind) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1FullHouse.threeOfAKind < hand2FullHouse.threeOfAKind) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }

      if (hand1FullHouse.pair && hand2FullHouse.pair) {
        if (hand1FullHouse.pair > hand2FullHouse.pair) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1FullHouse.pair < hand2FullHouse.pair) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      break;
    }
    case 'FourOfAKind': {
      const hand1FourOfAKind = getFourOfAKind(hand1);
      const hand2FourOfAKind = getFourOfAKind(hand2);

      if (hand1FourOfAKind.fourOfAKind && hand2FourOfAKind.fourOfAKind) {
        if (hand1FourOfAKind.fourOfAKind > hand2FourOfAKind.fourOfAKind) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1FourOfAKind.fourOfAKind < hand2FourOfAKind.fourOfAKind) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      if (hand1FourOfAKind.highestCard && hand2FourOfAKind.highestCard) {
        if (hand1FourOfAKind.highestCard > hand2FourOfAKind.highestCard) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1FourOfAKind.highestCard < hand2FourOfAKind.highestCard) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      break;
    }
    case 'ThreeOfAKind': {
      const hand1ThreeOfAKind = getThreeOfAKind(hand1);
      const hand2ThreeOfAKind = getThreeOfAKind(hand2);
      if (hand1ThreeOfAKind.threeOfAKind && hand2ThreeOfAKind.threeOfAKind) {
        if (hand1ThreeOfAKind.threeOfAKind > hand2ThreeOfAKind.threeOfAKind) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1ThreeOfAKind.threeOfAKind < hand2ThreeOfAKind.threeOfAKind) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      if (hand1ThreeOfAKind.highestCard && hand2ThreeOfAKind.highestCard) {
        if (hand1ThreeOfAKind.highestCard > hand2ThreeOfAKind.highestCard) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1ThreeOfAKind.highestCard < hand2ThreeOfAKind.highestCard) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }

      if (hand1ThreeOfAKind.secondHighestCard && hand2ThreeOfAKind.secondHighestCard) {
        if (hand1ThreeOfAKind.secondHighestCard > hand2ThreeOfAKind.secondHighestCard) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1ThreeOfAKind.secondHighestCard < hand2ThreeOfAKind.secondHighestCard) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      break;
    }
    case 'TwoPair': {
      const hand1TwoPair = getTwoPair(hand1);
      const hand2TwoPair = getTwoPair(hand2);

      if (hand1TwoPair.highestPair && hand2TwoPair.highestPair) {
        if (hand1TwoPair.highestPair > hand2TwoPair.highestPair) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1TwoPair.highestPair < hand2TwoPair.highestPair) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      if (hand1TwoPair.secondHighestPair && hand2TwoPair.secondHighestPair) {
        if (hand1TwoPair.secondHighestPair > hand2TwoPair.secondHighestPair) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1TwoPair.secondHighestPair < hand2TwoPair.secondHighestPair) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }

      if (hand1TwoPair.highestCard && hand2TwoPair.highestCard) {
        if (hand1TwoPair.highestCard > hand2TwoPair.highestCard) {
          return { hand1: { hasWon: true }, hand2: { hasWon: false } };
        }

        if (hand1TwoPair.highestCard < hand2TwoPair.highestCard) {
          return { hand1: { hasWon: false }, hand2: { hasWon: true } };
        }
      }
      break;
    }
    case 'OnePair':
      {
        const hand1Pair = getOnePair(hand1);
        const hand2Pair = getOnePair(hand2);

        if (hand1Pair.highestPair && hand2Pair.highestPair) {
          if (hand1Pair.highestPair > hand2Pair.highestPair) {
            return { hand1: { hasWon: true }, hand2: { hasWon: false } };
          }

          if (hand1Pair.highestPair < hand2Pair.highestPair) {
            return { hand1: { hasWon: false }, hand2: { hasWon: true } };
          }
        }
        if (hand1Pair.highestCard && hand2Pair.highestCard) {
          if (hand1Pair.highestCard > hand2Pair.highestCard) {
            return { hand1: { hasWon: true }, hand2: { hasWon: false } };
          }

          if (hand1Pair.highestCard < hand2Pair.highestCard) {
            return { hand1: { hasWon: false }, hand2: { hasWon: true } };
          }
        }
        if (hand1Pair.secondHighestCard && hand2Pair.secondHighestCard) {
          if (hand1Pair.secondHighestCard > hand2Pair.secondHighestCard) {
            return { hand1: { hasWon: true }, hand2: { hasWon: false } };
          }

          if (hand1Pair.secondHighestCard < hand2Pair.secondHighestCard) {
            return { hand1: { hasWon: false }, hand2: { hasWon: true } };
          }
        }
        if (hand1Pair.thirdHighestCard && hand2Pair.thirdHighestCard) {
          if (hand1Pair.thirdHighestCard > hand2Pair.thirdHighestCard) {
            return { hand1: { hasWon: true }, hand2: { hasWon: false } };
          }

          if (hand1Pair.thirdHighestCard < hand2Pair.thirdHighestCard) {
            return { hand1: { hasWon: false }, hand2: { hasWon: true } };
          }
        }
      }
      break;
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
