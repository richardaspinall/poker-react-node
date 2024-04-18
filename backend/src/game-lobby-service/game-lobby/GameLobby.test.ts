import { createPokerTable } from '@tests/helpers/createPokerTable';

import { PokerTable } from '../../game/PokerTable';
import { GameLobby } from './GameLobby';

describe('GameLobby', () => {
  let gameLobby: GameLobby;
  let pokerTable: PokerTable;

  beforeEach(() => {
    gameLobby = new GameLobby();
    pokerTable = createPokerTable('table-1', 2);
  });

  describe('addPokerTable', () => {
    it('should add a table to the game lobby', () => {
      gameLobby.addPokerTable(pokerTable);
      const pokerTables = gameLobby.getPokerTables();

      expect(pokerTables[pokerTable.getName()]).toBe(pokerTable);
    });
  });

  describe('getPokerTables', () => {
    it('should return one poker table', () => {
      gameLobby.addPokerTable(pokerTable);
      const pokerTables = gameLobby.getPokerTables();

      expect(pokerTables[pokerTable.getName()]).toBe(pokerTable);
      expect(Object.keys(pokerTables).length).toEqual(1);
    });
  });

  describe('isNameTaken', () => {
    it('should return true if the name is taken', () => {
      gameLobby.addPokerTable(pokerTable);
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
