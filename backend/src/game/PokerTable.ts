// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';
import { Rooms } from '../sockets/Rooms';
import { Seat } from './Seat';

// Internal utils
import { Logger } from '../utils/Logger';
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

  private constructor(tableName: string, numberOfSeats: number, roomId: string) {
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
    const res = Rooms.createRoom(tableName);
    if (res.error) {
      return new ResultError(res.error);
    }
    const roomId = res.getValue();
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
          const tableIsReady = this.checkTableReady();
          if (tableIsReady) {
            let event = 'start_game';
            let payload = {
              tableName: tableName,
            };
            let send_events = Rooms.sendEventToRoom('table_1', event, payload);
            if (send_events.error) {
              return Result.error(send_events.error);
            }
          }
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
