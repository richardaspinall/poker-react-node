import { Player } from './Player';
import { Seat } from './Seat';

describe('Seat', () => {
  let seat: Seat;

  beforeEach(() => {
    seat = Seat.createSeat(1, false);
  });

  it('initializes with the correct values', async () => {
    expect(seat.getSeatNumber()).toBe(1);
    expect(seat.isSeatTaken()).toBe(false);
    expect(seat.getPlayer()).toBeUndefined();
  });

  it('assigns and removes player', async () => {
    const user = new Player(1234, 'testuser');
    seat.assignPlayer(user);
    expect(seat.isSeatTaken()).toBe(true);
    expect(seat.getPlayer()).toBe(user);

    seat.removePlayer();
    expect(seat.isSeatTaken()).toBe(false);
    expect(seat.getPlayer()).toBeUndefined();
  });
});
