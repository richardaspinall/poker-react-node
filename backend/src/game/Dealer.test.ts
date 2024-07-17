import { createPokerTableWithPlayers } from '@tests/helpers/createPokerTableWithPlayers';

import { Dealer } from './Dealer';
import { Game } from './Game';
import { PokerTable } from './PokerTable';

describe('Dealer', () => {
  let newPokerTable: PokerTable;

  beforeEach(() => {
    const pokerTableName = 'table_1';
    const numberOfSeats = 3;
    const { pokerTable } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);

    newPokerTable = pokerTable;
  });

  it('should create a new game', () => {
    Dealer.newGame(newPokerTable);

    const game = newPokerTable.getGame() as Game;

    expect(game).toBeInstanceOf(Game);
    expect(game.getGameState().getSmallBlind()).toBe(50);
    expect(game.getGameState().getBigBlind()).toBe(100);
    expect(game.getGameState().getPot()).toBe(0);
    expect(game.getGameState().getCurrentBet()).toBe(100);
    expect(game.getGameState().getRound()).toBe('pre-flop');
    expect(game.getGameState().getCommunityCards()).toEqual([]);
  });

  it('should deal cards to players', () => {
    Dealer.newGame(newPokerTable);
    Dealer.dealCards(newPokerTable);

    const seats = newPokerTable.getSeats();

    seats.forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        expect(player.getCards().length).toBe(2);
      }
    });
  });

  describe('foldPlayer', () => {
    it('should return empty cards for folded player', () => {
      Dealer.newGame(newPokerTable);
      Dealer.dealCards(newPokerTable);
      let player;
      const game = newPokerTable.getGame() as Game;
      const seatToAct = game.getGameState().getSeatToAct();

      const seats = newPokerTable.getSeats();

      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.foldCards(newPokerTable, player.getUserId());
            const playerCards = player.getCards();
            // TODO: Fix this test new cards have been dealt after folding
            // Fix by creating a game with 3 players
            expect(playerCards.length).toEqual(0);
          }
        }
      });
    });
  });

  describe('actionHandler', () => {
    it('should update the seat action when an action button is clicked', () => {
      Dealer.newGame(newPokerTable);
      Dealer.dealCards(newPokerTable);
      let player;
      const game = newPokerTable.getGame() as Game;
      const seatToAct = game.getGameState().getSeatToAct();
      const seats = newPokerTable.getSeats();

      // should we look to create a function that gets the userid without looping through seats?
      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.actionHandler(newPokerTable, 'call', 0, player.getUserId());
          }
        }
      });

      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            const playerAction = player?.getPlayerAction();
            if (playerAction) {
              expect(playerAction).toEqual('call');
            }
          }
        }
      });
    });

    it('player bet should update current game bet', () => {
      Dealer.newGame(newPokerTable);
      Dealer.dealCards(newPokerTable);
      let player;
      const game = newPokerTable.getGame() as Game;
      const seatToAct = game.getGameState().getSeatToAct();
      const seats = newPokerTable.getSeats();

      // should we look to create a function that gets the userid without looping through seats?
      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.actionHandler(newPokerTable, 'bet', 10, player.getUserId());
          }
        }
      });

      const currentGameBet = game.getGameState().getCurrentBet();
      expect(currentGameBet).toEqual(10);
    });

    it('player raise should up last raised by ', () => {
      Dealer.newGame(newPokerTable);
      Dealer.dealCards(newPokerTable);
      let player;
      const game = newPokerTable.getGame() as Game;
      let seatToAct = game.getGameState().getSeatToAct();
      const seats = newPokerTable.getSeats();
      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.actionHandler(newPokerTable, 'bet', 100, player.getUserId());
          }
        }
      });

      seatToAct = game.getGameState().getSeatToAct();
      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.actionHandler(newPokerTable, 'raise', 200, player.getUserId());
          }
        }
      });

      const lastRaisedBy = game.getGameState().getLastRaisedBy();
      expect(lastRaisedBy).toEqual(seatToAct);
    });

    it('should fail when invalid action sent to handler', () => {
      Dealer.newGame(newPokerTable);
      Dealer.dealCards(newPokerTable);
      let player;
      const game = newPokerTable.getGame() as Game;
      let seatToAct = game.getGameState().getSeatToAct();
      const seats = newPokerTable.getSeats();
      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.actionHandler(newPokerTable, 'bet', 200, player.getUserId());
          }
        }
      });

      seatToAct = game.getGameState().getSeatToAct();
      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            const resp = Dealer.actionHandler(newPokerTable, 'check', 0, player.getUserId());
            expect(resp.getError()?.code).toEqual('player_action_invalid');
          }
        }
      });
    });

    // it('', () => {});

    // it.only('should end turn when game and seat action is bet and no one has raised', () => {
    //   Dealer.newGame(newPokerTable);
    //   Dealer.dealCards(newPokerTable);
    //   let player;
    //   const game = newPokerTable.getGame() as Game;
    //   let seatToAct = game.getGameState().getSeatToAct();
    //   const currentRound = game.getGameState().getRound();
    //   console.log(`cr ${currentRound}`);
    //   console.log(`cr seat ${seatToAct}`);
    //   const seats = newPokerTable.getSeats();
    //   seats.forEach((seat) => {
    //     if (seat.getSeatNumber() === seatToAct) {
    //       player = seat.getPlayer();
    //       if (player) {
    //         Dealer.actionHandler(newPokerTable, 'call', 0, player.getUserId());
    //       }
    //     }
    //   });

    //   seatToAct = game.getGameState().getSeatToAct();
    //   console.log(`cr seat ${seatToAct}`);
    //   seats.forEach((seat) => {
    //     if (seat.getSeatNumber() === seatToAct) {
    //       player = seat.getPlayer();
    //       if (player) {
    //         Dealer.actionHandler(newPokerTable, 'call', 0, player.getUserId());
    //       }
    //     }
    //   });
    //   const updatedCurrentRound = game.getGameState().getRound();
    //   expect(updatedCurrentRound).toEqual('flop');
    // });
  });
});
