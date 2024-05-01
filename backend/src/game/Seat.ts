import { User } from '../users/User';

/**
 * Seat class to represent a seat at a poker table
 */
export class Seat {
  private seatNumber: string;
  private isTaken: boolean;
  private user?: User;

  public constructor(seatNumber: string, isTaken: boolean) {
    this.seatNumber = seatNumber;
    this.isTaken = isTaken;
  }

  public static createSeat(seatNumber: string, isTaken: boolean = false): Seat {
    return new Seat(seatNumber, isTaken);
  }

  public assignUser(user: User): void {
    this.user = user;
    this.isTaken = true;
  }

  public removeUser(): void {
    this.user = undefined;
    this.isTaken = false;
  }

  public isSeatTaken(): boolean {
    return this.isTaken;
  }

  public getUser(): User | undefined {
    return this.user;
  }

  public getSeatNumber(): string {
    return this.seatNumber;
  }
}
