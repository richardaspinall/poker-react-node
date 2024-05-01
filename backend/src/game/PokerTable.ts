import { Result, ResultSuccess } from '@infra/Result';

import { SeatNotFoundError } from '../handlers/poker-tables/errors/SeatNotFoundError';
import { PlayerAlreadySeatedError } from '../handlers/poker-tables/errors/gen/PlayerAlreadySeatedError';
import { PlayerNotFoundAtPokerTableError } from '../handlers/poker-tables/errors/gen/PlayerNotFoundAtPokerTableError';
import { SeatTakenError } from '../handlers/poker-tables/errors/gen/SeatTakenError';
import { Player } from './Player';
import { Seat } from './Seat';

/* 
  PokerTable is responsible for managing a single poker table. It will be responsible for managing the game state (which is a class), players at a table..
*/

export class PokerTable {
  private name: string;
  private seats: Seat[];

  private constructor(name: string, numberOfSeats: number) {
    this.name = name;

    const seatsArray = [];
    const seatString = 'seat-';
    let seatNumber = 1;
    for (let i = 0; i < numberOfSeats; i++) {
      const newSeat = Seat.createSeat(seatString + seatNumber);
      seatsArray.push(newSeat);
      seatNumber++;
    }
    this.seats = seatsArray;
  }

  public static createPokerTable(pokerTableName: string, numberOfSeats: number): Result<PokerTable> {
    const newPokerTable = new PokerTable(pokerTableName, numberOfSeats);
    return new ResultSuccess(newPokerTable);
  }

  public addPlayer(seatNumber: string, player: Player): Result<void> {
    for (const seat of this.seats) {
      if (seat.getUser()?.getUserName() === player.getUserName()) {
        return Result.error(new PlayerAlreadySeatedError());
      }
    }
    for (const seat of this.seats) {
      if (seat.getSeatNumber() == seatNumber) {
        if (seat.isSeatTaken()) {
          return Result.error(new SeatTakenError());
        } else {
          seat.assignUser(player);
          return Result.success();
        }
      }
    }
    return Result.error(new SeatNotFoundError());
  }

  public removePlayer(seatNumber: string, userId: number): Result<void> {
    for (const seat of this.seats) {
      if (seat.getUser()?.getUserId() === userId && seat.getSeatNumber() === seatNumber) {
        seat.removeUser();
        return Result.success();
      }
    }

    return Result.error(new PlayerNotFoundAtPokerTableError());
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
      if (seat.getUser() === undefined) {
        return false;
      }
    }
    return true;
  }
}
