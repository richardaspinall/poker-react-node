import { CardShortCode } from '@shared/game/types/CardShortCode';

import { Player, determineHandWinner } from './determineHandWinner';

describe('determineHandWinner', () => {
  const players: Player[] = [];
  beforeEach(() => {
    players.length = 0;
    players.push({
      name: 'Player 1',
    });
    players.push({
      name: 'Player 2',
    });
  });

  it('returns winner with straight flush)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.AceOfClubs, CardShortCode.SixOfClubs];
    players[1].holeCards = [CardShortCode.KingOfClubs, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2C', '3C', '4C', '5C', '6C'].sort());
  });

  it('returns winner with four of a kind)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.SevenOfDiamonds,
      CardShortCode.FourOfClubs,
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.SevenOfSpades];
    players[1].holeCards = [CardShortCode.KingOfClubs, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7C', '7D', '7H', '7S', 'KH'].sort());
  });

  it('returns winner with full house)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.ThreeOfSpades,
      CardShortCode.ThreeOfClubs,
      CardShortCode.KingOfSpades,
      CardShortCode.EightOfDiamonds,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.EightOfSpades, CardShortCode.EightOfHearts];
    players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3S', '3C', 'KS', 'KH', 'KD'].sort());
  });

  it('returns winner with flush)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.TenOfClubs,
      CardShortCode.EightOfDiamonds,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.EightOfSpades, CardShortCode.EightOfHearts];
    players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.KingOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7C', '3C', '10C', 'AC', 'KC'].sort()); // TC or 10C?
  });

  it('returns winner with straight)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.AceOfSpades,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfDiamonds,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SixOfSpades, CardShortCode.EightOfHearts];
    players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.TwoOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['4C', '5D', '6S', '7C', '8H'].sort());
  });

  it('returns winner with three of a kind)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.SevenOfDiamonds,
      CardShortCode.FourOfClubs,
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.EightOfSpades];
    players[1].holeCards = [CardShortCode.AceOfHearts, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1'); // Player 1 has the three 7's I think?
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7C', '7D', '7H', 'KH', '8S'].sort());
  });

  it('returns winner with two pair)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.SevenOfDiamonds,
      CardShortCode.FourOfClubs,
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SixOfClubs, CardShortCode.EightOfSpades];
    players[1].holeCards = [CardShortCode.QueenOfDiamonds, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7C', '7D', 'KH', 'KD', 'QD'].sort()); // QD instead of AS??
  });

  it('returns winner with one pair)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.JackOfHearts,
      CardShortCode.FourOfClubs,
      CardShortCode.AceOfSpades,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SixOfClubs, CardShortCode.EightOfSpades];
    players[1].holeCards = [CardShortCode.AceOfHearts, CardShortCode.NineOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7C', 'JH', 'KH', 'AS', 'AH'].sort());
  });

  it('returns winner with high card)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfClubs,
      CardShortCode.JackOfHearts,
      CardShortCode.FourOfClubs,
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfHearts,
    ];
    players[0].holeCards = [CardShortCode.AceOfHearts, CardShortCode.NineOfDiamonds];
    players[1].holeCards = [CardShortCode.SixOfClubs, CardShortCode.EightOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['AH', '9D', 'KH', 'JH', '7C'].sort());
  });

  it('returns a tie with straight flush)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.SixOfClubs,
    ];
    players[0].holeCards = [CardShortCode.AceOfClubs, CardShortCode.AceOfDiamonds];
    players[1].holeCards = [CardShortCode.KingOfDiamonds, CardShortCode.KingOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);

    // Assert
    expect(winningPlayers.length).toBe(2);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[1].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2C', '3C', '4C', '5C', '6C'].sort());
    expect(winningPlayers[1].hand?.sort()).toStrictEqual(['2C', '3C', '4C', '5C', '6C'].sort());
  });
});
