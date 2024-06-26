import { Player } from './Player';

/**
 * Seat class to represent a seat at a poker table
 */
export class Seat {
  private seatNumber: number;
  private isTaken: boolean;
  private user?: Player;
  private seatAction: string;

  private constructor(seatNumber: number, isTaken: boolean, seatAction: string) {
    this.seatNumber = seatNumber;
    this.isTaken = isTaken;
    this.seatAction = seatAction;
  }

  public static createSeat(seatNumber: number, isTaken: boolean = false, seatAction = ''): Seat {
    return new Seat(seatNumber, isTaken, seatAction);
  }

  public assignPlayer(user: Player): void {
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

  public getPlayer(): Player | undefined {
    return this.user;
  }

  public getSeatNumber(): number {
    return this.seatNumber;
  }

  public getSeatAction(): string {
    return this.seatAction;
  }

  public updateSeatAction(seatAction: string){
    this.seatAction = seatAction;
  }
}
