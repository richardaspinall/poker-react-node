import { Player } from './Player';

/**
 * Seat class to represent a seat at a poker table
 */

export type SeatAction = 'initial' | 'fold' | 'check' | 'call' | 'bet' | 'raise';

export class Seat {
  private seatNumber: number;
  private isTaken: boolean;
  private user?: Player;
  private seatAction: SeatAction;

  private constructor(seatNumber: number, isTaken: boolean, seatAction: string) {
    this.seatNumber = seatNumber;
    this.isTaken = isTaken;
    this.seatAction = 'check';
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

  public getSeatAction(): SeatAction {
    return this.seatAction;
  }

  public updateSeatAction(seatAction: SeatAction){
    this.seatAction = seatAction;
  }
}
