/**
 * Seat class to represent a seat at a poker table
 */
export class Seat {
  public seatNumber: string;
  public playerId: string;
  public isTaken: boolean;

  public constructor(seatNumber: string, playerId: string, isTaken: boolean) {
    this.seatNumber = seatNumber;
    this.playerId = playerId;
    this.isTaken = isTaken;
  }

  public static createSeat(seatNumber: string, playerId: string = '', isTaken: boolean = false): Seat {
    return new Seat(seatNumber, playerId, isTaken);
  }
}
