// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';
import { Seat } from './Seat';
import {
  PlayerAlreadySeatedError,
  PlayerNotFoundAtTableError,
  SeatNotFoundError,
  SeatTakenError,
} from '@shared/errors/PokerTableErrors';

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

  public static createPokerTable(tableName: string, numberOfSeats: number, roomId: string): Result<PokerTable> {
    const newTable = new PokerTable(tableName, numberOfSeats, roomId);
    return new ResultSuccess(newTable);
  }

  public sitAtTable(tableName: string, seatNumber: string, clientId: string): Result<void> {
    for (const seat of this.seats) {
      if (seat.playerId === clientId) {
        return Result.error(new PlayerAlreadySeatedError());
      }
    }
    for (const seat of this.seats) {
      if (seat.seatNumber == seatNumber) {
        if (seat.isTaken) {
          return Result.error(new SeatTakenError());
        } else {
          seat.playerId = clientId;
          seat.isTaken = true;
          return Result.success();
        }
      }
    }
    return Result.error(new SeatNotFoundError());
  }

  public leaveTable(seatNumber: string, clientId: string): Result<void> {
    for (const seat of this.seats) {
      if (seat.playerId === clientId && seat.seatNumber === seatNumber) {
        seat.playerId = '';
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

  private checkTableReady(): boolean {
    for (const seat of this.seats) {
      if (seat.playerId == '') {
        return false;
      }
    }
    // StartGame logic to go here [separate task]
    // startGame(tableName)
    return true;
  }
}
