import { Sockets } from '../sockets/Sockets';
import { PokerTable } from './PokerTable';

export class Dealer {
  public static dealCards(pokerTable: PokerTable) {
    const seats = pokerTable.getSeats();
    const playerOne = seats[0].username;
    const playerTwo = seats[1].username;

    const event = 'deal_cards';
    const payload = { cards: ['Ks', 'Qs'] };
    const payloadTwo = { cards: ['Js', 'As'] };
    Sockets.sendEventToClient(playerOne, event, payload);
    Sockets.sendEventToClient(playerTwo, event, payloadTwo);
  }
}
