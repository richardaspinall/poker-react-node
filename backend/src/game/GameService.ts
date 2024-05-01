import { EventEmitter } from 'events';

import { Rooms } from '../sockets/Rooms';
import { PokerTable } from './PokerTable';

export class GameService {
  public static eventEmitter = new EventEmitter();

  // Initializes any necessary listeners or setup required for the Dealer
  public static initialize() {
    GameService.eventEmitter.on('playerJoined', GameService.notifyPlayerAdded);
    // Setup can be expanded as needed
  }

  // Notifies when a player is added and checks if the table is ready
  public static notifyPlayerAdded(pokerTable: PokerTable) {
    if (pokerTable.isPokerTableReady()) {
      GameService.startGame();
    }
  }

  public static startGame() {
    const event = 'start_game';
    const payload = { tableName: 'table_1' };
    console.log('Game started');
    const sendEvents = Rooms.sendEventToRoom('table_1', event, payload);
    // this.manageGameSession(); // Additional logic for managing the game session

    if (sendEvents.isError()) {
      // debug(sendEvents.getError());
      throw sendEvents.getError();
    }
  }
}
