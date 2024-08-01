import { CardShortCode } from '@shared/game/types/CardShortCode';

import { Player, PokerHand, determineHandWinner } from './determineHandWinner';

describe('determineHandWinner', () => {
  const players: Player[] = [];
  let count = 0;
  beforeEach(() => {
    players.length = 0;
    players.push({
      name: 'Player 1',
      handType: PokerHand.HighCard,
    });
    players.push({
      name: 'Player 2',
      handType: PokerHand.HighCard,
    });

    count += 1;
  });

  it('returns winner with random hand 1 (test 1)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.JackOfClubs,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfClubs,
      CardShortCode.SixOfDiamonds,
      CardShortCode.AceOfSpades,
    ];
    players[0].holeCards = [CardShortCode.TwoOfSpades, CardShortCode.JackOfDiamonds];
    players[1].holeCards = [CardShortCode.EightOfHearts, CardShortCode.NineOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2S', 'AC', 'AS', 'JC', 'JD'].sort());
  });

  it('returns winner with random hand 2 (test 2)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfDiamonds,
      CardShortCode.SevenOfSpades,
      CardShortCode.SevenOfDiamonds,
      CardShortCode.QueenOfSpades,
      CardShortCode.AceOfSpades,
    ];
    players[0].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.FourOfHearts];
    players[1].holeCards = [CardShortCode.NineOfClubs, CardShortCode.AceOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7D', '7H', '7S', 'AS', 'QS'].sort());
  });

  it('returns winner with random hand 3 (test 3)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfDiamonds,
      CardShortCode.FiveOfHearts,
      CardShortCode.SevenOfHearts,
      CardShortCode.KingOfDiamonds,
      CardShortCode.FourOfSpades,
    ];
    players[0].holeCards = [CardShortCode.SevenOfDiamonds, CardShortCode.KingOfSpades];
    players[1].holeCards = [CardShortCode.AceOfDiamonds, CardShortCode.TenOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7D', '7D', '7H', 'KD', 'KS'].sort());
  });

  it('returns winner with random hand 4 (test 4)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.AceOfClubs,
      CardShortCode.JackOfDiamonds,
      CardShortCode.SevenOfSpades,
    ];
    players[0].holeCards = [CardShortCode.TwoOfDiamonds, CardShortCode.TenOfHearts];
    players[1].holeCards = [CardShortCode.ThreeOfHearts, CardShortCode.FiveOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2C', '3H', '4C', '5D', 'AC'].sort());
  });

  it('returns winner with random hand 5 (test 5)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.NineOfClubs,
      CardShortCode.SevenOfSpades,
      CardShortCode.SevenOfClubs,
      CardShortCode.KingOfSpades,
      CardShortCode.SixOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.JackOfClubs];
    players[1].holeCards = [CardShortCode.JackOfHearts, CardShortCode.TenOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10S', '7C', '7S', 'JH', 'KS'].sort());
  });

  it('returns winner with random hand 6 (test 6)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.EightOfDiamonds,
      CardShortCode.EightOfSpades,
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.QueenOfDiamonds,
      CardShortCode.FourOfSpades,
    ];
    players[0].holeCards = [CardShortCode.QueenOfSpades, CardShortCode.KingOfClubs];
    players[1].holeCards = [CardShortCode.KingOfClubs, CardShortCode.TwoOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['8D', '8S', 'KC', 'QD', 'QS'].sort());
  });

  it('returns winner with random hand 7 (test 7)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.ThreeOfClubs,
      CardShortCode.AceOfDiamonds,
      CardShortCode.JackOfDiamonds,
      CardShortCode.AceOfClubs,
      CardShortCode.FiveOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.ThreeOfDiamonds, CardShortCode.KingOfClubs];
    players[1].holeCards = [CardShortCode.FiveOfClubs, CardShortCode.SixOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['5C', '5D', 'AC', 'AD', 'JD'].sort());
  });

  it('returns winner with random hand 8 (test 8)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.ThreeOfSpades,
      CardShortCode.JackOfHearts,
      CardShortCode.EightOfSpades,
      CardShortCode.KingOfHearts,
      CardShortCode.JackOfClubs,
    ];
    players[0].holeCards = [CardShortCode.FiveOfClubs, CardShortCode.QueenOfHearts];
    players[1].holeCards = [CardShortCode.FourOfSpades, CardShortCode.AceOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['8S', 'AD', 'JC', 'JH', 'KH'].sort());
  });

  it('returns winner with random hand 9 (test 9)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfDiamonds,
      CardShortCode.SevenOfHearts,
      CardShortCode.TenOfDiamonds,
      CardShortCode.EightOfDiamonds,
      CardShortCode.AceOfHearts,
    ];
    players[0].holeCards = [CardShortCode.ThreeOfSpades, CardShortCode.FiveOfDiamonds];
    players[1].holeCards = [CardShortCode.FourOfClubs, CardShortCode.AceOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10D', '7H', '8D', 'AC', 'AH'].sort());
  });

  it('returns winner with random hand 10 (test 10)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfSpades,
      CardShortCode.TenOfHearts,
      CardShortCode.EightOfSpades,
      CardShortCode.SevenOfDiamonds,
      CardShortCode.NineOfSpades,
    ];
    players[0].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.FiveOfClubs];
    players[1].holeCards = [CardShortCode.SevenOfClubs, CardShortCode.NineOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7C', '7D', '9H', '9S', 'AS'].sort());
  });

  it('returns winner with random hand 11 (test 11)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.QueenOfClubs,
      CardShortCode.FourOfDiamonds,
      CardShortCode.NineOfSpades,
      CardShortCode.FourOfHearts,
      CardShortCode.EightOfSpades,
    ];
    players[0].holeCards = [CardShortCode.JackOfDiamonds, CardShortCode.QueenOfHearts];
    players[1].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.SevenOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['4D', '4H', 'JD', 'QC', 'QH'].sort());
  });

  it('returns winner with random hand 12 (test 12)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.JackOfHearts,
      CardShortCode.SixOfDiamonds,
      CardShortCode.SevenOfHearts,
      CardShortCode.JackOfSpades,
      CardShortCode.TwoOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.AceOfClubs, CardShortCode.FiveOfClubs];
    players[1].holeCards = [CardShortCode.SixOfClubs, CardShortCode.TenOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10C', '6C', '6D', 'JH', 'JS'].sort());
  });

  it('returns winner with random hand 13 (test 13)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.FiveOfDiamonds,
      CardShortCode.SixOfSpades,
      CardShortCode.ThreeOfHearts,
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.EightOfHearts,
    ];
    players[0].holeCards = [CardShortCode.FourOfDiamonds, CardShortCode.JackOfClubs];
    players[1].holeCards = [CardShortCode.FiveOfDiamonds, CardShortCode.TwoOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3D', '3H', '5D', '5D', '8H'].sort());
  });

  it('returns winner with random hand 14 (test 14)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.FiveOfSpades,
      CardShortCode.TwoOfDiamonds,
      CardShortCode.ThreeOfClubs,
      CardShortCode.EightOfSpades,
      CardShortCode.JackOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.NineOfClubs, CardShortCode.SevenOfDiamonds];
    players[1].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.FourOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['4D', '5S', '8D', '8S', 'JD'].sort());
  });

  it('returns winner with random hand 15 (test 15)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.JackOfClubs,
      CardShortCode.TenOfClubs,
      CardShortCode.TwoOfSpades,
      CardShortCode.FourOfSpades,
      CardShortCode.TwoOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SixOfDiamonds, CardShortCode.TwoOfSpades];
    players[1].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.NineOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10C', '2H', '2S', '2S', 'JC'].sort());
  });

  it('returns winner with random hand 16 (test 16)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.NineOfHearts,
      CardShortCode.QueenOfDiamonds,
      CardShortCode.SevenOfHearts,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
    ];
    players[0].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.JackOfHearts];
    players[1].holeCards = [CardShortCode.EightOfClubs, CardShortCode.SevenOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7D', '7H', '8C', '9H', 'QD'].sort());
  });

  it('returns winner with random hand 17 (test 17)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.FourOfSpades,
      CardShortCode.QueenOfHearts,
      CardShortCode.SevenOfClubs,
      CardShortCode.KingOfDiamonds,
      CardShortCode.NineOfClubs,
    ];
    players[0].holeCards = [CardShortCode.TenOfClubs, CardShortCode.KingOfClubs];
    players[1].holeCards = [CardShortCode.AceOfDiamonds, CardShortCode.EightOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10C', '9C', 'KC', 'KD', 'QH'].sort());
  });

  it('returns winner with random hand 18 (test 18)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfDiamonds,
      CardShortCode.FiveOfHearts,
      CardShortCode.AceOfSpades,
      CardShortCode.FiveOfDiamonds,
      CardShortCode.ThreeOfHearts,
    ];
    players[0].holeCards = [CardShortCode.TwoOfHearts, CardShortCode.FourOfSpades];
    players[1].holeCards = [CardShortCode.FiveOfSpades, CardShortCode.QueenOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['5D', '5H', '5S', 'AD', 'AS'].sort());
  });

  it('returns winner with random hand 19 (test 19)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.QueenOfSpades,
      CardShortCode.KingOfClubs,
      CardShortCode.EightOfClubs,
      CardShortCode.FourOfDiamonds,
      CardShortCode.SixOfHearts,
    ];
    players[0].holeCards = [CardShortCode.EightOfHearts, CardShortCode.TwoOfSpades];
    players[1].holeCards = [CardShortCode.TwoOfDiamonds, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['6H', '8C', 'KC', 'KD', 'QS'].sort());
  });

  it('returns winner with random hand 20 (test 20)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.FourOfClubs,
      CardShortCode.SixOfClubs,
      CardShortCode.FourOfDiamonds,
      CardShortCode.TenOfSpades,
      CardShortCode.NineOfClubs,
    ];
    players[0].holeCards = [CardShortCode.ThreeOfHearts, CardShortCode.QueenOfDiamonds];
    players[1].holeCards = [CardShortCode.FourOfSpades, CardShortCode.TwoOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10S', '4C', '4D', '4S', '9C'].sort());
  });

  it('returns winner with random hand 21 (test 21)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SixOfSpades,
      CardShortCode.EightOfClubs,
      CardShortCode.FiveOfSpades,
      CardShortCode.SixOfDiamonds,
      CardShortCode.ThreeOfHearts,
    ];
    players[0].holeCards = [CardShortCode.JackOfClubs, CardShortCode.TwoOfDiamonds];
    players[1].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.FiveOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3H', '6D', '6S', '8C', '8D'].sort());
  });

  it('returns winner with random hand 22 (test 22)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.JackOfDiamonds,
      CardShortCode.AceOfDiamonds,
      CardShortCode.ThreeOfSpades,
      CardShortCode.FiveOfClubs,
      CardShortCode.TenOfClubs,
    ];
    players[0].holeCards = [CardShortCode.FourOfDiamonds, CardShortCode.EightOfDiamonds];
    players[1].holeCards = [CardShortCode.SixOfHearts, CardShortCode.FiveOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10C', '5C', '5H', 'AD', 'JD'].sort());
  });

  it('returns winner with random hand 23 (test 23)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.QueenOfClubs,
      CardShortCode.SixOfHearts,
      CardShortCode.KingOfDiamonds,
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfClubs,
    ];
    players[0].holeCards = [CardShortCode.ThreeOfClubs, CardShortCode.TwoOfDiamonds];
    players[1].holeCards = [CardShortCode.ThreeOfDiamonds, CardShortCode.FiveOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3C', '3S', 'KC', 'KD', 'QC'].sort());
  });

  it('returns winner with random hand 24 (test 24)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SixOfDiamonds,
      CardShortCode.EightOfSpades,
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.ThreeOfClubs,
      CardShortCode.EightOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.TwoOfDiamonds, CardShortCode.JackOfClubs];
    players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.FiveOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3C', '3D', '8D', '8S', 'AC'].sort());
  });

  it('returns winner with random hand 25 (test 25)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfSpades,
      CardShortCode.TwoOfSpades,
      CardShortCode.QueenOfHearts,
      CardShortCode.QueenOfSpades,
      CardShortCode.FourOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.TwoOfHearts, CardShortCode.TenOfSpades];
    players[1].holeCards = [CardShortCode.FiveOfHearts, CardShortCode.NineOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2H', '2S', 'AS', 'QH', 'QS'].sort());
  });

  it('returns winner with random hand 26 (test 26)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.QueenOfDiamonds,
      CardShortCode.TwoOfHearts,
      CardShortCode.NineOfHearts,
      CardShortCode.TenOfClubs,
      CardShortCode.TenOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.QueenOfHearts, CardShortCode.FourOfHearts];
    players[1].holeCards = [CardShortCode.NineOfSpades, CardShortCode.EightOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10C', '10D', '9H', 'QD', 'QH'].sort());
  });

  it('returns winner with random hand 27 (test 27)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfHearts,
      CardShortCode.TenOfHearts,
      CardShortCode.FiveOfHearts,
      CardShortCode.QueenOfHearts,
      CardShortCode.ThreeOfSpades,
    ];
    players[0].holeCards = [CardShortCode.ThreeOfDiamonds, CardShortCode.JackOfSpades];
    players[1].holeCards = [CardShortCode.FourOfHearts, CardShortCode.QueenOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10H', '4H', '5H', 'AH', 'QH'].sort());
  });

  it('returns winner with random hand 28 (test 28)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.JackOfSpades,
      CardShortCode.ThreeOfClubs,
      CardShortCode.KingOfClubs,
      CardShortCode.TwoOfClubs,
      CardShortCode.EightOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.NineOfDiamonds, CardShortCode.TwoOfClubs];
    players[1].holeCards = [CardShortCode.SixOfDiamonds, CardShortCode.AceOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2C', '2C', '9D', 'JS', 'KC'].sort());
  });

  it('returns winner with random hand 29 (test 29)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SixOfHearts,
      CardShortCode.QueenOfClubs,
      CardShortCode.TenOfSpades,
      CardShortCode.NineOfClubs,
      CardShortCode.FourOfSpades,
    ];
    players[0].holeCards = [CardShortCode.QueenOfHearts, CardShortCode.TenOfHearts];
    players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.FourOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10H', '10S', '9C', 'QC', 'QH'].sort());
  });

  it('returns winner with random hand 30 (test 30)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfDiamonds,
      CardShortCode.ThreeOfSpades,
      CardShortCode.ThreeOfClubs,
      CardShortCode.QueenOfDiamonds,
      CardShortCode.QueenOfHearts,
    ];
    players[0].holeCards = [CardShortCode.QueenOfClubs, CardShortCode.AceOfSpades];
    players[1].holeCards = [CardShortCode.NineOfDiamonds, CardShortCode.FiveOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3C', '3S', 'QC', 'QD', 'QH'].sort());
  });

  it('returns winner with random hand 31 (test 31)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.QueenOfHearts,
      CardShortCode.TwoOfDiamonds,
      CardShortCode.SixOfClubs,
      CardShortCode.AceOfSpades,
      CardShortCode.FourOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.TenOfHearts, CardShortCode.FourOfHearts];
    players[1].holeCards = [CardShortCode.FourOfSpades, CardShortCode.KingOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['4D', '4S', 'AS', 'KH', 'QH'].sort());
  });

  it('returns winner with random hand 32 (test 32)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TenOfHearts,
      CardShortCode.FourOfDiamonds,
      CardShortCode.AceOfDiamonds,
      CardShortCode.FiveOfHearts,
      CardShortCode.FiveOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.TwoOfSpades, CardShortCode.KingOfDiamonds];
    players[1].holeCards = [CardShortCode.FiveOfSpades, CardShortCode.AceOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['5D', '5H', '5S', 'AD', 'AD'].sort());
  });

  it('returns winner with random hand 33 (test 33)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.FourOfHearts,
      CardShortCode.ThreeOfSpades,
      CardShortCode.SixOfDiamonds,
      CardShortCode.EightOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.TenOfDiamonds, CardShortCode.FiveOfClubs];
    players[1].holeCards = [CardShortCode.SevenOfDiamonds, CardShortCode.JackOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3D', '3S', '7D', '8D', 'JH'].sort());
  });

  it('returns winner with random hand 34 (test 34)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.JackOfClubs,
      CardShortCode.TwoOfHearts,
      CardShortCode.TenOfSpades,
      CardShortCode.SixOfSpades,
      CardShortCode.AceOfSpades,
    ];
    players[0].holeCards = [CardShortCode.AceOfClubs, CardShortCode.FourOfDiamonds];
    players[1].holeCards = [CardShortCode.NineOfSpades, CardShortCode.SixOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10S', '6S', '6S', '9S', 'AS'].sort());
  });

  it('returns winner with random hand 35 (test 35)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfSpades,
      CardShortCode.EightOfClubs,
      CardShortCode.EightOfHearts,
      CardShortCode.FiveOfDiamonds,
      CardShortCode.AceOfHearts,
    ];
    players[0].holeCards = [CardShortCode.FiveOfSpades, CardShortCode.TenOfSpades];
    players[1].holeCards = [CardShortCode.FourOfDiamonds, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['8C', '8H', 'AH', 'AS', 'KD'].sort());
  });

  it('returns winner with random hand 36 (test 36)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.EightOfHearts,
      CardShortCode.KingOfSpades,
      CardShortCode.TwoOfDiamonds,
      CardShortCode.EightOfClubs,
      CardShortCode.FiveOfHearts,
    ];
    players[0].holeCards = [CardShortCode.SixOfSpades, CardShortCode.AceOfHearts];
    players[1].holeCards = [CardShortCode.JackOfClubs, CardShortCode.EightOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['8C', '8C', '8H', 'JC', 'KS'].sort());
  });

  it('returns winner with random hand 37 (test 37)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfDiamonds,
      CardShortCode.QueenOfDiamonds,
      CardShortCode.EightOfClubs,
      CardShortCode.ThreeOfSpades,
      CardShortCode.SixOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.KingOfSpades, CardShortCode.TwoOfClubs];
    players[1].holeCards = [CardShortCode.SevenOfSpades, CardShortCode.JackOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2C', '2D', '8C', 'KS', 'QD'].sort());
  });

  it('returns winner with random hand 38 (test 38)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.KingOfSpades,
      CardShortCode.QueenOfSpades,
      CardShortCode.FourOfSpades,
      CardShortCode.AceOfDiamonds,
      CardShortCode.KingOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.SevenOfSpades, CardShortCode.QueenOfSpades];
    players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.FiveOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['4S', '7S', 'KS', 'QS', 'QS'].sort());
  });

  it('returns winner with random hand 39 (test 39)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfClubs,
      CardShortCode.EightOfDiamonds,
      CardShortCode.AceOfSpades,
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.KingOfHearts, CardShortCode.SevenOfHearts];
    players[1].holeCards = [CardShortCode.AceOfDiamonds, CardShortCode.SixOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['8D', 'AC', 'AD', 'AS', 'KD'].sort());
  });

  it('returns winner with random hand 40 (test 40)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.QueenOfHearts,
      CardShortCode.AceOfDiamonds,
      CardShortCode.FiveOfDiamonds,
      CardShortCode.EightOfHearts,
      CardShortCode.TenOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.FiveOfClubs, CardShortCode.QueenOfDiamonds];
    players[1].holeCards = [CardShortCode.EightOfClubs, CardShortCode.QueenOfClubs];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['8C', '8H', 'AD', 'QC', 'QH'].sort());
  });

  it('returns winner with random hand 41 (test 41)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.AceOfHearts,
      CardShortCode.TwoOfClubs,
      CardShortCode.SevenOfHearts,
      CardShortCode.FourOfDiamonds,
      CardShortCode.NineOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.SevenOfDiamonds, CardShortCode.AceOfSpades];
    players[1].holeCards = [CardShortCode.KingOfHearts, CardShortCode.SixOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7D', '7H', '9D', 'AH', 'AS'].sort());
  });

  it('returns winner with random hand 42 (test 42)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.KingOfHearts,
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.JackOfHearts,
      CardShortCode.SixOfClubs,
      CardShortCode.FourOfHearts,
    ];
    players[0].holeCards = [CardShortCode.NineOfSpades, CardShortCode.SevenOfDiamonds];
    players[1].holeCards = [CardShortCode.QueenOfClubs, CardShortCode.SevenOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['6C', '7D', 'JH', 'KH', 'QC'].sort());
  });

  it('returns winner with random hand 43 (test 43)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfSpades,
      CardShortCode.FourOfHearts,
      CardShortCode.ThreeOfHearts,
      CardShortCode.NineOfSpades,
      CardShortCode.AceOfHearts,
    ];
    players[0].holeCards = [CardShortCode.TenOfHearts, CardShortCode.FourOfDiamonds];
    players[1].holeCards = [CardShortCode.EightOfClubs, CardShortCode.SevenOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['10H', '4D', '4H', '9S', 'AH'].sort());
  });

  it('returns winner with random hand 44 (test 44)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.ThreeOfSpades,
      CardShortCode.KingOfSpades,
      CardShortCode.JackOfSpades,
      CardShortCode.QueenOfClubs,
      CardShortCode.SevenOfClubs,
    ];
    players[0].holeCards = [CardShortCode.FiveOfHearts, CardShortCode.SevenOfClubs];
    players[1].holeCards = [CardShortCode.ThreeOfHearts, CardShortCode.KingOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['3H', '3S', 'KD', 'KS', 'QC'].sort());
  });

  it('returns winner with random hand 45 (test 45)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.SixOfHearts,
      CardShortCode.NineOfDiamonds,
      CardShortCode.TwoOfDiamonds,
      CardShortCode.EightOfHearts,
    ];
    players[0].holeCards = [CardShortCode.JackOfDiamonds, CardShortCode.EightOfClubs];
    players[1].holeCards = [CardShortCode.QueenOfDiamonds, CardShortCode.KingOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['6H', '8C', '8H', '9D', 'JD'].sort());
  });

  it('returns winner with random hand 46 (test 46)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TenOfClubs,
      CardShortCode.FiveOfSpades,
      CardShortCode.SixOfSpades,
      CardShortCode.SixOfClubs,
      CardShortCode.SevenOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.FiveOfHearts, CardShortCode.KingOfClubs];
    players[1].holeCards = [CardShortCode.AceOfHearts, CardShortCode.EightOfDiamonds];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['5H', '5S', '6C', '6S', 'KC'].sort());
  });

  it('returns winner with random hand 47 (test 47)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.FourOfDiamonds,
      CardShortCode.TwoOfClubs,
      CardShortCode.QueenOfHearts,
      CardShortCode.FiveOfHearts,
      CardShortCode.AceOfHearts,
    ];
    players[0].holeCards = [CardShortCode.NineOfHearts, CardShortCode.FiveOfDiamonds];
    players[1].holeCards = [CardShortCode.TenOfDiamonds, CardShortCode.KingOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['5D', '5H', '9H', 'AH', 'QH'].sort());
  });

  it('returns winner with random hand 48 (test 48)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.SevenOfDiamonds,
      CardShortCode.ThreeOfSpades,
      CardShortCode.SixOfDiamonds,
      CardShortCode.SevenOfHearts,
      CardShortCode.JackOfHearts,
    ];
    players[0].holeCards = [CardShortCode.TwoOfSpades, CardShortCode.NineOfDiamonds];
    players[1].holeCards = [CardShortCode.TenOfSpades, CardShortCode.SixOfSpades];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['6D', '6S', '7D', '7H', 'JH'].sort());
  });

  it('returns winner with random hand 49 (test 49)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfHearts,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfHearts,
      CardShortCode.SevenOfHearts,
      CardShortCode.SevenOfDiamonds,
    ];
    players[0].holeCards = [CardShortCode.FourOfDiamonds, CardShortCode.FiveOfSpades];
    players[1].holeCards = [CardShortCode.NineOfSpades, CardShortCode.SixOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['2H', '5H', '5S', '7D', '7H'].sort());
  });

  it('returns winner with random hand 50 (test 50)', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.KingOfSpades,
      CardShortCode.NineOfClubs,
      CardShortCode.SevenOfSpades,
      CardShortCode.ThreeOfSpades,
      CardShortCode.TwoOfClubs,
    ];
    players[0].holeCards = [CardShortCode.KingOfSpades, CardShortCode.KingOfDiamonds];
    players[1].holeCards = [CardShortCode.FourOfDiamonds, CardShortCode.QueenOfHearts];

    // Act
    const winningPlayers = determineHandWinner(players, communityCards);
    // console.log('Test ' + count, winningPlayers[0].hand?.sort());

    // Assert
    expect(winningPlayers.length).toBe(1);
    expect(winningPlayers[0].name).toBe('Player 2');
    expect(winningPlayers[0].hand?.sort()).toStrictEqual(['7S', '9C', 'KD', 'KS', 'KS'].sort());
  });

  // it('returns winner with random hand 51 (test 51)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SixOfSpades,
  //     CardShortCode.QueenOfClubs,
  //     CardShortCode.SevenOfSpades,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.AceOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.JackOfDiamonds, CardShortCode.FourOfClubs];
  //   players[1].holeCards = [CardShortCode.KingOfSpades, CardShortCode.FourOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SixOfSpades,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.SevenOfSpades,
  //       CardShortCode.AceOfDiamonds,
  //       CardShortCode.QueenOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 52 (test 52)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SixOfDiamonds,
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.KingOfClubs,
  //     CardShortCode.JackOfClubs,
  //     CardShortCode.JackOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.SixOfDiamonds, CardShortCode.FourOfDiamonds];
  //   players[1].holeCards = [CardShortCode.NineOfHearts, CardShortCode.NineOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.SixOfDiamonds,
  //       CardShortCode.JackOfClubs,
  //       CardShortCode.JackOfDiamonds,
  //       CardShortCode.KingOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 53 (test 53)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.SixOfClubs,
  //     CardShortCode.EightOfDiamonds,
  //     CardShortCode.TenOfDiamonds,
  //     CardShortCode.AceOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.JackOfSpades, CardShortCode.SevenOfHearts];
  //   players[1].holeCards = [CardShortCode.FiveOfSpades, CardShortCode.EightOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SixOfClubs,
  //       CardShortCode.EightOfDiamonds,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.AceOfSpades,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 54 (test 54)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.NineOfClubs,
  //     CardShortCode.AceOfClubs,
  //     CardShortCode.SixOfDiamonds,
  //     CardShortCode.NineOfHearts,
  //     CardShortCode.FourOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.NineOfHearts, CardShortCode.SevenOfSpades];
  //   players[1].holeCards = [CardShortCode.KingOfClubs, CardShortCode.SevenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfClubs,
  //       CardShortCode.SixOfDiamonds,
  //       CardShortCode.NineOfClubs,
  //       CardShortCode.NineOfHearts,
  //       CardShortCode.AceOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 55 (test 55)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.TenOfHearts,
  //     CardShortCode.NineOfDiamonds,
  //     CardShortCode.EightOfHearts,
  //     CardShortCode.SevenOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.AceOfSpades, CardShortCode.NineOfSpades];
  //   players[1].holeCards = [CardShortCode.ThreeOfDiamonds, CardShortCode.TwoOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.SevenOfHearts,
  //       CardShortCode.EightOfHearts,
  //       CardShortCode.NineOfDiamonds,
  //       CardShortCode.TenOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 56 (test 56)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FiveOfClubs,
  //     CardShortCode.ThreeOfHearts,
  //     CardShortCode.AceOfClubs,
  //     CardShortCode.SixOfClubs,
  //     CardShortCode.KingOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.KingOfSpades];
  //   players[1].holeCards = [CardShortCode.TwoOfClubs, CardShortCode.SixOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfHearts,
  //       CardShortCode.FiveOfClubs,
  //       CardShortCode.SixOfClubs,
  //       CardShortCode.AceOfClubs,
  //       CardShortCode.KingOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 57 (test 57)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FiveOfHearts,
  //     CardShortCode.FourOfDiamonds,
  //     CardShortCode.NineOfClubs,
  //     CardShortCode.QueenOfClubs,
  //     CardShortCode.KingOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfDiamonds, CardShortCode.FourOfClubs];
  //   players[1].holeCards = [CardShortCode.FiveOfHearts, CardShortCode.FourOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfDiamonds,
  //       CardShortCode.FiveOfHearts,
  //       CardShortCode.NineOfClubs,
  //       CardShortCode.KingOfHearts,
  //       CardShortCode.QueenOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 58 (test 58)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.KingOfHearts,
  //     CardShortCode.EightOfDiamonds,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.TenOfSpades,
  //     CardShortCode.TwoOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.AceOfHearts, CardShortCode.KingOfDiamonds];
  //   players[1].holeCards = [CardShortCode.TwoOfSpades, CardShortCode.KingOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.EightOfDiamonds,
  //       CardShortCode.KingOfDiamonds,
  //       CardShortCode.KingOfHearts,
  //       CardShortCode.TenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 59 (test 59)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfHearts,
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.KingOfClubs,
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.TwoOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfClubs, CardShortCode.SixOfClubs];
  //   players[1].holeCards = [CardShortCode.ThreeOfClubs, CardShortCode.AceOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfClubs,
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.EightOfHearts,
  //       CardShortCode.KingOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 60 (test 60)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.FourOfHearts,
  //     CardShortCode.EightOfClubs,
  //     CardShortCode.KingOfClubs,
  //     CardShortCode.TenOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfHearts, CardShortCode.AceOfDiamonds];
  //   players[1].holeCards = [CardShortCode.TenOfSpades, CardShortCode.TenOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.FourOfHearts,
  //       CardShortCode.EightOfClubs,
  //       CardShortCode.KingOfClubs,
  //       CardShortCode.TenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 61 (test 61)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FiveOfDiamonds,
  //     CardShortCode.JackOfSpades,
  //     CardShortCode.JackOfClubs,
  //     CardShortCode.EightOfDiamonds,
  //     CardShortCode.SixOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfDiamonds, CardShortCode.FiveOfDiamonds];
  //   players[1].holeCards = [CardShortCode.ThreeOfClubs, CardShortCode.FourOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FiveOfDiamonds,
  //       CardShortCode.SixOfHearts,
  //       CardShortCode.EightOfDiamonds,
  //       CardShortCode.JackOfClubs,
  //       CardShortCode.JackOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 62 (test 62)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfDiamonds,
  //     CardShortCode.NineOfClubs,
  //     CardShortCode.FourOfClubs,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.TenOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.FiveOfClubs, CardShortCode.SevenOfDiamonds];
  //   players[1].holeCards = [CardShortCode.NineOfHearts, CardShortCode.JackOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfClubs,
  //       CardShortCode.EightOfDiamonds,
  //       CardShortCode.NineOfClubs,
  //       CardShortCode.KingOfDiamonds,
  //       CardShortCode.TenOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 63 (test 63)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TenOfSpades,
  //     CardShortCode.FiveOfSpades,
  //     CardShortCode.KingOfSpades,
  //     CardShortCode.JackOfHearts,
  //     CardShortCode.FiveOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.EightOfHearts, CardShortCode.EightOfClubs];
  //   players[1].holeCards = [CardShortCode.FiveOfDiamonds, CardShortCode.QueenOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FiveOfClubs,
  //       CardShortCode.FiveOfSpades,
  //       CardShortCode.JackOfHearts,
  //       CardShortCode.KingOfSpades,
  //       CardShortCode.TenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 64 (test 64)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.QueenOfDiamonds,
  //     CardShortCode.NineOfClubs,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.TenOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.KingOfSpades, CardShortCode.SevenOfHearts];
  //   players[1].holeCards = [CardShortCode.NineOfClubs, CardShortCode.FourOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.NineOfClubs,
  //       CardShortCode.KingOfDiamonds,
  //       CardShortCode.QueenOfDiamonds,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 65 (test 65)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.NineOfClubs,
  //     CardShortCode.SevenOfHearts,
  //     CardShortCode.FourOfHearts,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.AceOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfSpades, CardShortCode.JackOfClubs];
  //   players[1].holeCards = [CardShortCode.FourOfSpades, CardShortCode.ThreeOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfHearts,
  //       CardShortCode.SevenOfHearts,
  //       CardShortCode.NineOfClubs,
  //       CardShortCode.AceOfDiamonds,
  //       CardShortCode.KingOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 66 (test 66)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.KingOfSpades,
  //     CardShortCode.SixOfHearts,
  //     CardShortCode.FiveOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.KingOfSpades, CardShortCode.NineOfDiamonds];
  //   players[1].holeCards = [CardShortCode.KingOfClubs, CardShortCode.EightOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.FiveOfDiamonds,
  //       CardShortCode.SixOfHearts,
  //       CardShortCode.KingOfDiamonds,
  //       CardShortCode.KingOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 67 (test 67)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfClubs,
  //     CardShortCode.AceOfClubs,
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.JackOfHearts,
  //     CardShortCode.FiveOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.SevenOfDiamonds, CardShortCode.EightOfHearts];
  //   players[1].holeCards = [CardShortCode.TwoOfDiamonds, CardShortCode.JackOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FiveOfClubs,
  //       CardShortCode.EightOfClubs,
  //       CardShortCode.AceOfClubs,
  //       CardShortCode.AceOfSpades,
  //       CardShortCode.JackOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 68 (test 68)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.AceOfHearts,
  //     CardShortCode.JackOfClubs,
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.TenOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.EightOfSpades, CardShortCode.SixOfDiamonds];
  //   players[1].holeCards = [CardShortCode.FourOfSpades, CardShortCode.ThreeOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.AceOfSpades,
  //       CardShortCode.JackOfClubs,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 69 (test 69)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfHearts,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.SevenOfClubs,
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.EightOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.FiveOfClubs, CardShortCode.SixOfClubs];
  //   players[1].holeCards = [CardShortCode.JackOfDiamonds, CardShortCode.FiveOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.SevenOfClubs,
  //       CardShortCode.EightOfDiamonds,
  //       CardShortCode.EightOfHearts,
  //       CardShortCode.KingOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 70 (test 70)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfSpades,
  //     CardShortCode.ThreeOfClubs,
  //     CardShortCode.AceOfDiamonds,
  //     CardShortCode.NineOfSpades,
  //     CardShortCode.KingOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.JackOfSpades, CardShortCode.SevenOfClubs];
  //   players[1].holeCards = [CardShortCode.SixOfDiamonds, CardShortCode.ThreeOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfClubs,
  //       CardShortCode.EightOfSpades,
  //       CardShortCode.NineOfSpades,
  //       CardShortCode.AceOfDiamonds,
  //       CardShortCode.KingOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 71 (test 71)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TenOfHearts,
  //     CardShortCode.FiveOfClubs,
  //     CardShortCode.FiveOfDiamonds,
  //     CardShortCode.SixOfClubs,
  //     CardShortCode.TwoOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.ThreeOfClubs, CardShortCode.NineOfHearts];
  //   players[1].holeCards = [CardShortCode.TwoOfSpades, CardShortCode.SixOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfHearts,
  //       CardShortCode.FiveOfClubs,
  //       CardShortCode.FiveOfDiamonds,
  //       CardShortCode.SixOfClubs,
  //       CardShortCode.TenOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 72 (test 72)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.TenOfHearts,
  //     CardShortCode.NineOfSpades,
  //     CardShortCode.NineOfHearts,
  //     CardShortCode.EightOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.SixOfClubs, CardShortCode.FiveOfSpades];
  //   players[1].holeCards = [CardShortCode.NineOfHearts, CardShortCode.JackOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.EightOfHearts,
  //       CardShortCode.NineOfHearts,
  //       CardShortCode.NineOfSpades,
  //       CardShortCode.AceOfSpades,
  //       CardShortCode.TenOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 73 (test 73)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SevenOfSpades,
  //     CardShortCode.SixOfHearts,
  //     CardShortCode.TenOfClubs,
  //     CardShortCode.SixOfSpades,
  //     CardShortCode.TenOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfSpades, CardShortCode.QueenOfDiamonds];
  //   players[1].holeCards = [CardShortCode.SixOfSpades, CardShortCode.SevenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SixOfHearts,
  //       CardShortCode.SixOfSpades,
  //       CardShortCode.SevenOfSpades,
  //       CardShortCode.TenOfClubs,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 74 (test 74)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FiveOfHearts,
  //     CardShortCode.JackOfSpades,
  //     CardShortCode.ThreeOfHearts,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.SevenOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.JackOfDiamonds, CardShortCode.KingOfSpades];
  //   players[1].holeCards = [CardShortCode.NineOfSpades, CardShortCode.TenOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfHearts,
  //       CardShortCode.FiveOfHearts,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.SevenOfHearts,
  //       CardShortCode.JackOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 75 (test 75)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.AceOfClubs,
  //     CardShortCode.SixOfHearts,
  //     CardShortCode.QueenOfSpades,
  //     CardShortCode.AceOfHearts,
  //     CardShortCode.AceOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.AceOfHearts, CardShortCode.SixOfDiamonds];
  //   players[1].holeCards = [CardShortCode.JackOfSpades, CardShortCode.QueenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SixOfHearts,
  //       CardShortCode.AceOfClubs,
  //       CardShortCode.AceOfDiamonds,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.QueenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 76 (test 76)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.JackOfDiamonds,
  //     CardShortCode.ThreeOfDiamonds,
  //     CardShortCode.QueenOfClubs,
  //     CardShortCode.ThreeOfClubs,
  //     CardShortCode.TenOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.FourOfSpades, CardShortCode.NineOfHearts];
  //   players[1].holeCards = [CardShortCode.KingOfClubs, CardShortCode.FourOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfClubs,
  //       CardShortCode.ThreeOfDiamonds,
  //       CardShortCode.JackOfDiamonds,
  //       CardShortCode.QueenOfClubs,
  //       CardShortCode.TenOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 77 (test 77)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SixOfDiamonds,
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.SixOfHearts,
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.FourOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfHearts, CardShortCode.SixOfHearts];
  //   players[1].holeCards = [CardShortCode.KingOfSpades, CardShortCode.FiveOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.FourOfDiamonds,
  //       CardShortCode.SixOfDiamonds,
  //       CardShortCode.SixOfHearts,
  //       CardShortCode.AceOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 78 (test 78)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FourOfDiamonds,
  //     CardShortCode.QueenOfDiamonds,
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.SevenOfSpades,
  //     CardShortCode.JackOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfHearts, CardShortCode.JackOfClubs];
  //   players[1].holeCards = [CardShortCode.TenOfHearts, CardShortCode.SixOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfDiamonds,
  //       CardShortCode.SevenOfSpades,
  //       CardShortCode.AceOfSpades,
  //       CardShortCode.JackOfHearts,
  //       CardShortCode.QueenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 79 (test 79)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfSpades,
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.ThreeOfHearts,
  //     CardShortCode.SixOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.ThreeOfSpades];
  //   players[1].holeCards = [CardShortCode.TwoOfHearts, CardShortCode.QueenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfHearts,
  //       CardShortCode.SixOfSpades,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.EightOfSpades,
  //       CardShortCode.AceOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 80 (test 80)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfClubs,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.SevenOfClubs,
  //     CardShortCode.TenOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.KingOfClubs, CardShortCode.EightOfDiamonds];
  //   players[1].holeCards = [CardShortCode.FiveOfSpades, CardShortCode.SevenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SevenOfClubs,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.EightOfClubs,
  //       CardShortCode.KingOfDiamonds,
  //       CardShortCode.TenOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 81 (test 81)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.QueenOfSpades,
  //     CardShortCode.AceOfClubs,
  //     CardShortCode.EightOfHearts,
  //     CardShortCode.TwoOfHearts,
  //     CardShortCode.QueenOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.AceOfClubs, CardShortCode.FiveOfHearts];
  //   players[1].holeCards = [CardShortCode.SevenOfClubs, CardShortCode.TwoOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfHearts,
  //       CardShortCode.EightOfHearts,
  //       CardShortCode.AceOfClubs,
  //       CardShortCode.QueenOfDiamonds,
  //       CardShortCode.QueenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 82 (test 82)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TwoOfDiamonds,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.ThreeOfHearts,
  //     CardShortCode.TenOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfHearts, CardShortCode.QueenOfSpades];
  //   players[1].holeCards = [CardShortCode.SixOfDiamonds, CardShortCode.JackOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfDiamonds,
  //       CardShortCode.ThreeOfHearts,
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 83 (test 83)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.ThreeOfHearts,
  //     CardShortCode.FourOfSpades,
  //     CardShortCode.JackOfDiamonds,
  //     CardShortCode.KingOfHearts,
  //     CardShortCode.SevenOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfDiamonds, CardShortCode.ThreeOfHearts];
  //   players[1].holeCards = [CardShortCode.NineOfHearts, CardShortCode.QueenOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfHearts,
  //       CardShortCode.FourOfSpades,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.JackOfDiamonds,
  //       CardShortCode.KingOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 84 (test 84)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.JackOfSpades,
  //     CardShortCode.AceOfHearts,
  //     CardShortCode.NineOfHearts,
  //     CardShortCode.NineOfDiamonds,
  //     CardShortCode.FourOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.AceOfClubs, CardShortCode.NineOfClubs];
  //   players[1].holeCards = [CardShortCode.FiveOfSpades, CardShortCode.NineOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfHearts,
  //       CardShortCode.NineOfDiamonds,
  //       CardShortCode.NineOfHearts,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.JackOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 85 (test 85)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FourOfSpades,
  //     CardShortCode.TenOfSpades,
  //     CardShortCode.TenOfClubs,
  //     CardShortCode.EightOfClubs,
  //     CardShortCode.FiveOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.SevenOfSpades, CardShortCode.QueenOfSpades];
  //   players[1].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.NineOfSpades];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfSpades,
  //       CardShortCode.FiveOfDiamonds,
  //       CardShortCode.EightOfClubs,
  //       CardShortCode.TenOfClubs,
  //       CardShortCode.TenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 86 (test 86)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.AceOfSpades,
  //     CardShortCode.QueenOfSpades,
  //     CardShortCode.FourOfDiamonds,
  //     CardShortCode.AceOfClubs,
  //     CardShortCode.FourOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfClubs, CardShortCode.ThreeOfSpades];
  //   players[1].holeCards = [CardShortCode.FiveOfHearts, CardShortCode.TenOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfDiamonds,
  //       CardShortCode.FourOfHearts,
  //       CardShortCode.AceOfClubs,
  //       CardShortCode.AceOfSpades,
  //       CardShortCode.QueenOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 87 (test 87)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SevenOfHearts,
  //     CardShortCode.TenOfDiamonds,
  //     CardShortCode.QueenOfSpades,
  //     CardShortCode.JackOfHearts,
  //     CardShortCode.SixOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.FourOfSpades, CardShortCode.FourOfHearts];
  //   players[1].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.AceOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.SixOfClubs,
  //       CardShortCode.SevenOfHearts,
  //       CardShortCode.JackOfHearts,
  //       CardShortCode.QueenOfSpades,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 88 (test 88)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TenOfDiamonds,
  //     CardShortCode.QueenOfHearts,
  //     CardShortCode.ThreeOfClubs,
  //     CardShortCode.JackOfSpades,
  //     CardShortCode.ThreeOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.KingOfHearts, CardShortCode.AceOfClubs];
  //   players[1].holeCards = [CardShortCode.EightOfHearts, CardShortCode.AceOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfClubs,
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.JackOfSpades,
  //       CardShortCode.QueenOfHearts,
  //       CardShortCode.TenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 89 (test 89)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SevenOfSpades,
  //     CardShortCode.FourOfClubs,
  //     CardShortCode.FiveOfHearts,
  //     CardShortCode.ThreeOfClubs,
  //     CardShortCode.AceOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfDiamonds, CardShortCode.SevenOfClubs];
  //   players[1].holeCards = [CardShortCode.TenOfSpades, CardShortCode.SixOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfClubs,
  //       CardShortCode.FourOfClubs,
  //       CardShortCode.FiveOfHearts,
  //       CardShortCode.SevenOfSpades,
  //       CardShortCode.AceOfSpades,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 90 (test 90)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.ThreeOfClubs,
  //     CardShortCode.SixOfClubs,
  //     CardShortCode.TwoOfDiamonds,
  //     CardShortCode.JackOfDiamonds,
  //     CardShortCode.QueenOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.TwoOfHearts, CardShortCode.QueenOfClubs];
  //   players[1].holeCards = [CardShortCode.KingOfHearts, CardShortCode.EightOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfDiamonds,
  //       CardShortCode.ThreeOfClubs,
  //       CardShortCode.SixOfClubs,
  //       CardShortCode.JackOfDiamonds,
  //       CardShortCode.QueenOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 91 (test 91)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SevenOfHearts,
  //     CardShortCode.QueenOfClubs,
  //     CardShortCode.ThreeOfDiamonds,
  //     CardShortCode.JackOfClubs,
  //     CardShortCode.AceOfDiamonds,
  //   ];
  //   players[0].holeCards = [CardShortCode.FiveOfHearts, CardShortCode.NineOfClubs];
  //   players[1].holeCards = [CardShortCode.JackOfSpades, CardShortCode.EightOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfDiamonds,
  //       CardShortCode.SevenOfHearts,
  //       CardShortCode.AceOfDiamonds,
  //       CardShortCode.JackOfClubs,
  //       CardShortCode.QueenOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 92 (test 92)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.NineOfClubs,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.FourOfHearts,
  //     CardShortCode.QueenOfDiamonds,
  //     CardShortCode.KingOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.SevenOfSpades, CardShortCode.SixOfClubs];
  //   players[1].holeCards = [CardShortCode.ThreeOfDiamonds, CardShortCode.EightOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfHearts,
  //       CardShortCode.NineOfClubs,
  //       CardShortCode.KingOfDiamonds,
  //       CardShortCode.KingOfSpades,
  //       CardShortCode.QueenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 93 (test 93)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.FiveOfSpades,
  //     CardShortCode.EightOfDiamonds,
  //     CardShortCode.AceOfHearts,
  //     CardShortCode.KingOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.FourOfSpades, CardShortCode.FiveOfDiamonds];
  //   players[1].holeCards = [CardShortCode.ThreeOfHearts, CardShortCode.SevenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.FiveOfSpades,
  //       CardShortCode.EightOfDiamonds,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.KingOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 94 (test 94)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FourOfHearts,
  //     CardShortCode.ThreeOfClubs,
  //     CardShortCode.AceOfHearts,
  //     CardShortCode.SixOfSpades,
  //     CardShortCode.QueenOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.FourOfHearts, CardShortCode.TwoOfHearts];
  //   players[1].holeCards = [CardShortCode.KingOfHearts, CardShortCode.NineOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfClubs,
  //       CardShortCode.FourOfHearts,
  //       CardShortCode.SixOfSpades,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.QueenOfClubs,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 95 (test 95)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.QueenOfHearts,
  //     CardShortCode.FiveOfHearts,
  //     CardShortCode.ThreeOfDiamonds,
  //     CardShortCode.TwoOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.ThreeOfDiamonds, CardShortCode.NineOfHearts];
  //   players[1].holeCards = [CardShortCode.TwoOfClubs, CardShortCode.EightOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfHearts,
  //       CardShortCode.ThreeOfDiamonds,
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.FiveOfHearts,
  //       CardShortCode.QueenOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 96 (test 96)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.EightOfClubs,
  //     CardShortCode.ThreeOfSpades,
  //     CardShortCode.SevenOfDiamonds,
  //     CardShortCode.JackOfHearts,
  //     CardShortCode.ThreeOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.SixOfSpades, CardShortCode.AceOfClubs];
  //   players[1].holeCards = [CardShortCode.NineOfClubs, CardShortCode.KingOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.ThreeOfHearts,
  //       CardShortCode.ThreeOfSpades,
  //       CardShortCode.SevenOfDiamonds,
  //       CardShortCode.EightOfClubs,
  //       CardShortCode.JackOfHearts,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 97 (test 97)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FourOfSpades,
  //     CardShortCode.SixOfDiamonds,
  //     CardShortCode.KingOfDiamonds,
  //     CardShortCode.TwoOfHearts,
  //     CardShortCode.EightOfSpades,
  //   ];
  //   players[0].holeCards = [CardShortCode.QueenOfDiamonds, CardShortCode.AceOfSpades];
  //   players[1].holeCards = [CardShortCode.AceOfClubs, CardShortCode.JackOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfHearts,
  //       CardShortCode.FourOfSpades,
  //       CardShortCode.SixOfDiamonds,
  //       CardShortCode.EightOfSpades,
  //       CardShortCode.KingOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 98 (test 98)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.QueenOfDiamonds,
  //     CardShortCode.FourOfClubs,
  //     CardShortCode.AceOfHearts,
  //     CardShortCode.KingOfHearts,
  //     CardShortCode.SixOfHearts,
  //   ];
  //   players[0].holeCards = [CardShortCode.AceOfSpades, CardShortCode.ThreeOfSpades];
  //   players[1].holeCards = [CardShortCode.EightOfDiamonds, CardShortCode.TenOfClubs];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfClubs,
  //       CardShortCode.SixOfHearts,
  //       CardShortCode.AceOfHearts,
  //       CardShortCode.KingOfHearts,
  //       CardShortCode.QueenOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 99 (test 99)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.FourOfSpades,
  //     CardShortCode.SevenOfClubs,
  //     CardShortCode.NineOfHearts,
  //     CardShortCode.AceOfDiamonds,
  //     CardShortCode.FourOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.SevenOfHearts, CardShortCode.JackOfSpades];
  //   players[1].holeCards = [CardShortCode.ThreeOfSpades, CardShortCode.FiveOfHearts];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 2');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.FourOfClubs,
  //       CardShortCode.FourOfSpades,
  //       CardShortCode.SevenOfClubs,
  //       CardShortCode.NineOfHearts,
  //       CardShortCode.AceOfDiamonds,
  //     ].sort(),
  //   );
  // });

  // it('returns winner with random hand 100 (test 100)', async () => {
  //   // Arrange
  //   const communityCards: CardShortCode[] = [
  //     CardShortCode.SixOfSpades,
  //     CardShortCode.FourOfDiamonds,
  //     CardShortCode.TwoOfSpades,
  //     CardShortCode.ThreeOfDiamonds,
  //     CardShortCode.NineOfClubs,
  //   ];
  //   players[0].holeCards = [CardShortCode.SixOfSpades, CardShortCode.QueenOfClubs];
  //   players[1].holeCards = [CardShortCode.AceOfSpades, CardShortCode.QueenOfDiamonds];

  //   // Act
  //   const winningPlayers = determineHandWinner(players, communityCards);
  //   // console.log('Test ' + count, winningPlayers[0].hand?.sort());

  //   // Assert
  //   expect(winningPlayers.length).toBe(1);
  //   expect(winningPlayers[0].name).toBe('Player 1');
  //   expect(winningPlayers[0].hand?.sort()).toStrictEqual(
  //     [
  //       CardShortCode.TwoOfSpades,
  //       CardShortCode.ThreeOfDiamonds,
  //       CardShortCode.FourOfDiamonds,
  //       CardShortCode.SixOfSpades,
  //       CardShortCode.NineOfClubs,
  //     ].sort(),
  //   );
  // });
});
