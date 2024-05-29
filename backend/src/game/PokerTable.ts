import { Result, ResultSuccess } from '@infra/Result';

import { GameEmitter } from '../game-emitter';
import { SeatNotFoundError } from '../handlers/poker-tables/errors/SeatNotFoundError';
import { PlayerAlreadySeatedError } from '../handlers/poker-tables/errors/gen/PlayerAlreadySeatedError';
import { PlayerNotFoundAtPokerTableError } from '../handlers/poker-tables/errors/gen/PlayerNotFoundAtPokerTableError';
import { PlayerAlreadyFolded } from '../handlers/games/errors/gen/PlayerAlreadyFolded';
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
  private seats: Seat[];
  private dealerPosition: number;
  private game?: Game;

  private constructor(name: string, numberOfSeats: number) {
    this.name = name;

    const seatsArray = [];
    let seatNumber = 1;
    for (let i = 0; i < numberOfSeats; i++) {
      const newSeat = Seat.createSeat(seatNumber);
      seatsArray.push(newSeat);
      seatNumber++;
    }
    this.seats = seatsArray;

    this.dealerPosition = Math.floor(Math.random() * numberOfSeats + 1);
  }

  public static createPokerTable(pokerTableName: string, numberOfSeats: number): Result<PokerTable> {
    const newPokerTable = new PokerTable(pokerTableName, numberOfSeats);
    return new ResultSuccess(newPokerTable);
  }

  public addPlayer(seatNumber: number, player: Player): Result<void> {
    for (const seat of this.seats) {
      if (seat.getPlayer()?.getUsername() === player.getUsername()) {
        return Result.error(new PlayerAlreadySeatedError());
      }
    }
    for (const seat of this.seats) {
      if (seat.getSeatNumber() === seatNumber) {
        if (seat.isSeatTaken()) {
          return Result.error(new SeatTakenError());
        } else {
          seat.assignPlayer(player);

          GameEmitter.eventEmitter.emit('playerJoined', this.getName(), player.getUsername(), seatNumber);

          if (this.isPokerTableReady()) {
            Dealer.newGame(this);
          }
          return Result.success();
        }
      }
    }
    return Result.error(new SeatNotFoundError());
  }

  public removePlayer(seatNumber: number, userId: number): Result<void> {
    for (const seat of this.seats) {
      if (seat.getPlayer()?.getUserId() === userId && seat.getSeatNumber() === seatNumber) {
        seat.removePlayer();
        return Result.success();
      }
    }

    return Result.error(new PlayerNotFoundAtPokerTableError());
  }

  public foldPlayer(seatNumber: number, userId: number): Result<void> {
    for (const seat of this.seats) {
      if (seat.getPlayer()?.getUserId() === userId && seat.getSeatNumber() === seatNumber) {
        const player = seat.getPlayer();
        const playerCards = player?.getCards();
        if (!(playerCards && playerCards.length > 0)){
          return Result.error(new PlayerAlreadyFolded());
        }
        if (player){
          Dealer.foldCards(player);
          GameEmitter.eventEmitter.emit('foldCards', this.getName(), player.getUsername(), seatNumber);
          if (this.playersRemaining()){
            Dealer.updateTurn(this);
            return Result.success();
          }
        } else {
          return Result.error(new PlayerNotFoundAtPokerTableError());
        }

        // End game logic here
      }
    }

    return Result.error(new PlayerNotFoundAtPokerTableError());
  }

  public addGame(game: Game): void {
    this.game = game;
  }

  public getGame(): Game | undefined {
    return this.game;
  }

  public getAvailableSeats(): Seat[] {
    const availableSeats = [];

    for (const seat of this.seats) {
      if (seat.isSeatTaken() === false) {
        availableSeats.push(seat);
      }
    }
    return availableSeats;
  }

  public getSeats(): Seat[] {
    return this.seats;
  }

  public getName() {
    return this.name;
  }

  public isPokerTableReady(): boolean {
    for (const seat of this.seats) {
      if (seat.getPlayer() === undefined) {
        return false;
      }
    }
    return true;
  }

  public playersRemaining(): boolean {
    let count = 0;
    for (const seat of this.seats) {
      const playerCards = seat.getPlayer()?.getCards();
      if (playerCards && playerCards.length > 0) {
        count++;
      }
    }
    if (count > 0){
      return true;
    }

    return false;
  }

  public getDealerPosition(): number {
    return this.dealerPosition;
  }

  public getPlayerCount(): number {
    let count = 0;
    for (const seat of this.seats) {
      if (seat.isSeatTaken()) {
        count++;
      }
    }
    return count;
  }
}
