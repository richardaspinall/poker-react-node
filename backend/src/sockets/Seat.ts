
import { ResultError, ResultSuccess } from '../Result';
import Result from '../Result';


export default class Seat {

    public seatNumber: string;
    public playerId;
    public isTaken;

    public constructor(seatNumber: string, playerId: string, isTaken: boolean){
        this.seatNumber = seatNumber;
        // for whatever number of seats we want to create an array of seats
        this.playerId = playerId;
        // we then create a seats class to manage the number of seats
        this.isTaken = isTaken;
    }

    public static createSeat(
        seatNumber: string,
        playerId: string = '',
        isTaken: boolean = false
    ): Seat{
        return new Seat(seatNumber, playerId, isTaken);
    }



}
