import { Sockets } from 'src/sockets/Sockets';

import { Rooms } from '../sockets/Rooms';
import { PokerTable } from './PokerTable';

export class Dealer {
  public static dealCards(pokerTable: PokerTable) {
    console.log('Dealing cards');

    Sockets.sendEventToClient(clientId, event, payload);
  }
}
