import { Sockets } from '../sockets/Sockets';
import { UserRepository } from '../users/UserRepository';
import { PokerTable } from './PokerTable';

// TODO: tidy up this file
export class Dealer {
  public static async dealCards(pokerTable: PokerTable) {
    const seats = pokerTable.getSeats();
    const playerOne = seats[0].getPlayer()?.getUserId();
    const playerTwo = seats[1].getPlayer()?.getUserId();

    const event = 'deal_cards';
    const payload = { cards: ['Ks', 'Qs'] };
    const payloadTwo = { cards: ['Js', 'As'] };
    if (!playerOne || !playerTwo) {
      throw new Error('Players not seated');
    }

    const playerOneSessionIdOrError = await UserRepository.getSessionIdByUserId(playerOne);
    if (playerOneSessionIdOrError.isError()) {
      // debug(playerOneSessionIdOrError.getError());
      return;
    }

    const playerTwoSessionIdOrError = await UserRepository.getSessionIdByUserId(playerTwo);
    if (playerTwoSessionIdOrError.isError()) {
      // debug(playerTwoSessionIdOrError.getError());
      return;
    }
    Sockets.sendEventToClient(playerOneSessionIdOrError.getValue(), event, payload);
    Sockets.sendEventToClient(playerTwoSessionIdOrError.getValue(), event, payloadTwo);
  }
}