import GameLobby from './GameLobby';
import PokerTable from './PokerTable';

describe('GameLobby', () => {
  let gameLobby: GameLobby;
  let pokerTable: PokerTable;

  beforeEach(() => {
    gameLobby = new GameLobby();
    pokerTable = new PokerTable('table-1', 2);
  });

  describe('addTable', () => {
    it('should add a table to the game lobby', () => {
      gameLobby.addTable(pokerTable);

      expect(gameLobby.getTables()).toEqual([pokerTable]);
    });
  });

  describe('isNameTaken', () => {
    it('should return true if the name is taken', () => {
      gameLobby.addTable(pokerTable);

      expect(gameLobby.isNameTaken('table-1')).toEqual(true);
    });

    it('should return false if the name is not taken', () => {
      expect(gameLobby.isNameTaken('table-1')).toEqual(false);
    });
  });
});
