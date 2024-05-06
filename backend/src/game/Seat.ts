import { User } from '../users/User';

/**
 * Seat class to represent a seat at a poker table
 */
export class Seat {
  private seatNumber: number;
  private isTaken: boolean;
  private user?: User;

  public constructor(seatNumber: number, isTaken: boolean) {
    this.seatNumber = seatNumber;
    this.isTaken = isTaken;
  }

  public static createSeat(seatNumber: number, isTaken: boolean = false): Seat {
    return new Seat(seatNumber, isTaken);
  }

  public assignPlayer(user: User): void {
    this.user = user;
    this.isTaken = true;
  }

  public removePlayer(): void {
    this.user = undefined;
    this.isTaken = false;
  }

  public isSeatTaken(): boolean {
    return this.isTaken;
  }

  public getPlayer(): User | undefined {
    return this.user;
  }

  public getSeatNumber(): number {
    return this.seatNumber;
  }
}
