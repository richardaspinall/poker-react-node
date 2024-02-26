// Internal
import { GameLobby } from './GameLobby';
import { PokerTable } from '../../game/PokerTable';
import { createPokerTable } from '../../tests/helpers/createPokerTable';

describe('GameLobby', () => {
  let gameLobby: GameLobby;
  let pokerTable: PokerTable;

  beforeEach(() => {
    gameLobby = new GameLobby();
    pokerTable = createPokerTable('table-1', 2);
  });

  describe('addTable', () => {
    it('should add a table to the game lobby', () => {
      gameLobby.addTable(pokerTable);
      const tables = gameLobby.getTables();

      expect(tables[pokerTable.getName()]).toBe(pokerTable);
    });
  });

  describe('getTables', () => {
    it('should return one poker table', () => {
      gameLobby.addTable(pokerTable);
      const tables = gameLobby.getTables();

      expect(tables[pokerTable.getName()]).toBe(pokerTable);
      expect(Object.keys(tables).length).toEqual(1);
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

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
