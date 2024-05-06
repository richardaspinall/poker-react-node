import { Deck } from './Deck';
import { PokerTable } from './PokerTable';

export class Dealer {
  public static dealCards(pokerTable: PokerTable) {
    const deck = new Deck(); //TODO: should be created on the actual game which should be created in the PokerTable

    const seats = pokerTable.getSeats();

    seats.forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        player.setCards(deck.draw(2));
      }
    });
  }
}
