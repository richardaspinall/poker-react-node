/* 
Description:

This class is responsible for managing a single poker table. It will be responsible for managing the game state (which is a class), players at a table..
*/

// internal modules
import Rooms from '../sockets/Rooms';
import Logger from '../utils/Logger';

export default class PokerTable {
  constructor(private name: string, private numSeats: number) {
    const res = Rooms.createRoom(name);

    if (res.isError) {
      Logger.error(res.errorMessage);
    }
  }

  getName() {
    return this.name;
  }

  // Methods to add/remove players, start game, etc.
}
