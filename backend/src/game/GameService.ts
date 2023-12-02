import GameLobby from './GameLobby';

export default class GameService {
  private gameLobby: GameLobby;
  constructor() {
    this.gameLobby = new GameLobby();
  }

  createTable(numSeats: number) {
    return this.gameLobby.createTable(numSeats);
  }
}
