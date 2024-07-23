import { Result, ResultSuccess } from '@infra/Result';

import { GameEmitter } from '../game-emitter';
import { SeatNotFoundError } from '../handlers/poker-tables/errors/SeatNotFoundError';
import { PlayerAlreadySeatedError } from '../handlers/poker-tables/errors/gen/PlayerAlreadySeatedError';
import { PlayerNotFoundAtTableError } from '../handlers/poker-tables/errors/gen/PlayerNotFoundAtTableError';
import { SeatTakenError } from '../handlers/poker-tables/errors/gen/SeatTakenError';
import { Dealer } from './Dealer';
import { Game } from './Game';
import { Player } from './Player';
import { Seat } from './Seat';

/* 
  PokerTable is responsible for managing a single poker table. It will be responsible for managing the game state (which is a class), players at a table..
*/

export class PokerTable {
  private name: string;
  private seats: Map<number, Seat>;
  private playerSeatMap: Map<number, number>;
  private dealerPosition: number;
  private game?: Game;

  private constructor(name: string, numberOfSeats: number) {
    this.name = name;
    this.seats = new Map();
    this.playerSeatMap = new Map();

    let seatNumber = 1;
    for (let i = 0; i < numberOfSeats; i++) {
      const newSeat = Seat.createSeat(seatNumber);
      this.seats.set(seatNumber, newSeat);
      seatNumber++;
    }

    this.dealerPosition = Math.floor(Math.random() * numberOfSeats + 1);
  }

  // Factory method to create a new PokerTable
  public static create(pokerTableName: string, numberOfSeats: number): Result<PokerTable> {
    const newPokerTable = new PokerTable(pokerTableName, numberOfSeats);
    return new ResultSuccess(newPokerTable);
  }

  // Add a player to a seat at the table
  public join(seatNumber: number, player: Player): Result<void> {
    if (this.playerSeatMap.has(player.getUserId())) {
      return Result.error(new PlayerAlreadySeatedError());
    }

    if (this.seats.get(seatNumber)?.isSeatTaken()) {
      return Result.error(new SeatTakenError());
    }

    const seatToAssign = this.seats.get(seatNumber);
    if (seatToAssign) {
      seatToAssign.assignPlayer(player);
      this.playerSeatMap.set(player.getUserId(), seatNumber);

      GameEmitter.eventEmitter.emit('playerJoined', this.getName(), player.getUsername(), seatNumber);

      if (this.isReadyToStartGame()) {
        Dealer.newGame(this);
      }
      return Result.success();
    }

    return Result.error(new SeatNotFoundError());
  }

  // Remove a player from a seat at the table
  public leave(seatNumber: number, userId: number): Result<void> {
    if (this.playerSeatMap.get(userId)) {
      this.playerSeatMap.delete(userId);

      this.seats.get(seatNumber)?.removePlayer();
      return Result.success();
    }

    return Result.error(new PlayerNotFoundAtTableError());
  }

  public addGame(game: Game): void {
    this.game = game;
    this.dealerPosition = game.getGameState().getDealerPosition();
  }

  public getGame(): Game | undefined {
    return this.game;
  }

  public getAvailableSeatNumbers(): number[] {
    const availableSeats: number[] = [];

    this.seats.forEach((seat) => {
      if (!seat.isSeatTaken()) {
        availableSeats.push(seat.getSeatNumber());
      }
    });

    return availableSeats;
  }

  public getName() {
    return this.name;
  }

  public getSeats(): Map<number, Seat> {
    return this.seats;
  }

  public getSeatBySeatNumber(seatNumber: number): Seat | undefined {
    return this.seats.get(seatNumber);
  }

  public getSeatByUserId(userId: number): Seat | undefined {
    const seatNumber = this.playerSeatMap.get(userId);
    if (seatNumber) {
      return this.seats.get(seatNumber);
    }
  }

  public getPlayerByUserId(userId: number): Player | undefined {
    const seat = this.getSeatByUserId(userId);
    if (seat) {
      return seat.getPlayer();
    }
  }

  public getPlayerBySeatNumber(seatNumber: number): Player | undefined {
    const seat = this.getSeatBySeatNumber(seatNumber);
    if (seat) {
      return seat.getPlayer();
    }
  }

  public getSeatCount(): number {
    return this.seats.size;
  }

  public getDealerPosition(): number {
    return this.dealerPosition;
  }

  public getPlayerCount(): number {
    let count = 0;

    this.seats.forEach((seat) => {
      if (seat.isSeatTaken()) {
        count++;
      }
    });

    return count;
  }

  public isReadyToStartGame(): boolean {
    for (const seat of this.seats.values()) {
      if (!seat.isSeatTaken()) {
        return false;
      }
    }
    return true;
  }

  public hasRemainingPlayers(): boolean {
    let count = 0;

    this.seats.forEach((seat) => {
      const playerCards = seat.getPlayer()?.getCards();
      if (playerCards && playerCards.length > 0) {
        count++;
      }
    });

    if (count > 1) {
      return true;
    }

    return false;
  }
}
