import { Result, ResultSuccess } from '@infra/Result';

import {
  PlayerAlreadySeatedError,
  PlayerNotFoundAtTableError,
  SeatNotFoundError,
  SeatTakenError,
} from '../handlers/poker-tables/errors';
import { Seat } from './Seat';

/* 
  PokerTable is responsible for managing a single poker table. It will be responsible for managing the game state (which is a class), players at a table..
*/

export class PokerTable {
  private tableName: string;
  private seats: Seat[];

  private constructor(tableName: string, numberOfSeats: number) {
    this.tableName = tableName;

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

  public static createPokerTable(tableName: string, numberOfSeats: number): Result<PokerTable> {
    const newTable = new PokerTable(tableName, numberOfSeats);
    return new ResultSuccess(newTable);
  }

  public sitAtTable(seatNumber: string, username: string): Result<void> {
    for (const seat of this.seats) {
      if (seat.username === username) {
        return Result.error(new PlayerAlreadySeatedError());
      }
    }
    for (const seat of this.seats) {
      if (seat.seatNumber == seatNumber) {
        if (seat.isTaken) {
          return Result.error(new SeatTakenError());
        } else {
          seat.username = username;
          seat.isTaken = true;
          return Result.success();
        }
      }
    }
    return Result.error(new SeatNotFoundError());
  }

  public leaveTable(seatNumber: string, username: string): Result<void> {
    for (const seat of this.seats) {
      if (seat.username === username && seat.seatNumber === seatNumber) {
        seat.username = '';
        seat.isTaken = false;
        return Result.success();
      }
    }
    return Result.error(new PlayerNotFoundAtTableError());
  }

  public getAvailableSeats(): Seat[] {
    const availableSeats = [];

    for (const seat of this.seats) {
      if (seat.isTaken === false) {
        availableSeats.push(seat);
      }
    }
    return availableSeats;
  }

  public getName() {
    return this.tableName;
  }

  public checkTableReady(): boolean {
    for (const seat of this.seats) {
      if (seat.username == '') {
        return false;
      }
    }
    return true;
  }
}
