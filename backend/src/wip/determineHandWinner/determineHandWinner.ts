import { Card } from '@shared/game/types/Card';
import { CardShortCode } from '@shared/game/types/CardShortCode';

export type Player = {
  name: string;
  holeCards?: CardShortCode[];
  hand?: CardShortCode[];
};

type PlayerPokerHands = {
  straightFlush: boolean;
  fourOfAKind: boolean;
  fullHouse: boolean; // Take highest three cards and highest two cards
  flush: boolean;
  straight: boolean;
  threeOfAKind: boolean;
  threePair: boolean; // If three pair, take highest two and highest other card
  twoPair: boolean;
  onePair: boolean;
};

type Rank = 'C' | 'D' | 'H' | 'S';

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

  return winningPlayers;
}

// Combine players hole cards with community cards (7 cards)
export function combineHand(holeCards: CardShortCode[], communityCards: CardShortCode[]): CardShortCode[] {
  return [...holeCards, ...communityCards];
}

// Need to split '2C' so we can work and use logic against each character (`'2', 'C'`)
export function getRanks(cards: CardShortCode[]) {
  const ranks: string[] = [];

  cards.forEach((card) => {
    ranks.push(card.charAt(0));
  });

  return ranks;
}

// Order ranks
export function orderAndMapRanks(ranks: string[]): number[] {
  const ranksMappedToNumbers: number[] = [];

  ranks.forEach((rank) => {
    ranksMappedToNumbers.push(rankOrder[rank]);
  });

  return ranksMappedToNumbers.sort((a, b) => a - b);
}

// TODO: should return the highest flush
export function checkForFlush(cards: CardShortCode[]): boolean {
  const suitsCount = {
    C: 0,
    D: 0,
    H: 0,
    S: 0,
  };

  cards.forEach((card) => {
    const rank = card.charAt(1) as Rank;
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

  return Object.values(suitsCount).some((count) => count >= 5);
}

// TODO: should return the highest straight
export function checkForStraight(ranks: number[]): boolean {
  // 1234589 return true
  // 1245689 return false
  // 1256789 return true
  // 1234678 return false
  //
  // A = 0 or 14
  //

  let count = 1;
  let hasStraight = false;
  for (let index = 0; index < ranks.length; index++) {
    const element = ranks[index];
    const nextElement = ranks[index + 1];

    console.log('current', element);
    console.log('next', nextElement);

    if (element + 1 === nextElement) {
      count += 1;
      console.log(count);
    } else {
      count = 1;
      // TODO: maybe unnecessary: don't continue if index is 2 or greater and we have a count of 0 and they don't have a straight already
      if (index >= 2 && !hasStraight) {
        return false;
      }
    }

    if (count >= 5) {
      hasStraight = true;
    }
  }

  return hasStraight;
}

// Count each rank
export function countRanks(ranks: number[]) {
  const rankCountMap: { [key: number]: number } = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
  };

  ranks.forEach((rank) => {
    rankCountMap[rank] += 1;
  });

  return rankCountMap;
}
