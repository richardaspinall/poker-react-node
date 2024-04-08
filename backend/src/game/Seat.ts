/**
 * Seat class to represent a seat at a poker table
 */
export class Seat {
  public seatNumber: string;
  public username: string;
  public isTaken: boolean;

  public constructor(seatNumber: string, username: string, isTaken: boolean) {
    this.seatNumber = seatNumber;
    this.username = username;
    this.isTaken = isTaken;
  }

  public static createSeat(seatNumber: string, username: string = '', isTaken: boolean = false): Seat {
    return new Seat(seatNumber, username, isTaken);
  }
}
