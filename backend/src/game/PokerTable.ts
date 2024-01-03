
import { ResultError, ResultSuccess } from '../shared/Result';
import Result from '../shared/Result';
import Rooms from '../sockets/Rooms';
import Seat from './Seat';

export default class PokerTable {

    private static tables: Record<string, PokerTable> = {};

    private tableName;
    private seats;

    private roomId;

    private constructor(tableName: string, numberOfSeats: number, roomId: string){
        this.tableName = tableName;
        // for whatever number of seats we want to create an array of seats
        const seatsArray = [];
        let seatNumber = 1
        let seatString = 'seat-'  
        for (let i = 0; i < numberOfSeats; i++) {
            const newSeat = Seat.createSeat(seatString + seatNumber);
            seatsArray.push(newSeat);
            seatNumber++;
        }
        this.seats = seatsArray;
        this.roomId = roomId;
    }

    public static createPokerTable(tableName: string, numberOfSeats: number): Result<PokerTable>{
        const res = Rooms.createRoom(tableName);
        if (res.ok){
            const roomId = res.getValue();
            const newTable = new PokerTable(tableName, numberOfSeats, roomId);

            // Store the new table in the in-memory database
            PokerTable.tables[roomId] = newTable;

            return new ResultSuccess(newTable);
        }
        return new ResultError(res.errorMessage);
    }

    public static sitAtTable(tableName: string, seatNumber: string, clientId: string): Result<void> {
        let table = this.getTable(tableName);
        for (const seat of table.seats) {
            // Check if player is already seated at the table
            if (seat.playerId == clientId ){
                return Result.error('Player is already sitting at the table');
            }
        }
        for (const seat of table.seats) {
            // Check if the seat is already taken by someone else
            if (seat.seatNumber == seatNumber) {
                if (seat.isTaken){
                    return Result.error('Seat is already taken');
                } else {
                    // Update the seat properties
                    seat.playerId = clientId;
                    seat.isTaken = true;
                    // check if table is fully/ready
                    const tableReady = this.checkTableReady(table)
                    // Emit event to all clients connected that game is starting
                    if (tableReady.ok) {
                        let event = 'start_game';
                        let payload = {
                            tableName: tableName
                        };
                        let send_events = Rooms.sendEventToRoom('table_1', event, payload);
                        if (!send_events.ok) {
                            return Result.error(send_events.errorMessage);
                        }
                    }
                    return Result.success();
                }
            }
        }
        // Handle the case where the seat number is not found
        return Result.error('Seat not found');
    }

    public static getTable(tableName: string): PokerTable {
        return PokerTable.tables[tableName];
    }

    public static getAllTables(): PokerTable[] {
        return Object.values(PokerTable.tables);
    }

    public static checkTableReady(table: PokerTable): Result<void>{
        // update state or user to ready
        for (const seat of table.seats) {
            // If any seat has an empty id it's not ready to start
            if (seat.playerId == '' ){
                return Result.error('Seats still empty');
            }
        }
        // StartGame logic to go here [separate task]
        // startGame(tableName)
        return Result.success();
    }
}
