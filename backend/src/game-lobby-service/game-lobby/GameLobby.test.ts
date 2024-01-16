import GameLobby from './GameLobby';
import PokerTable from '../../game/PokerTable';
import Rooms from '../../sockets/Rooms';
import { ResultSuccess } from '../../shared/Result';

describe('GameLobby', () => {
  let gameLobby: GameLobby;
  let pokerTable: PokerTable;

  beforeEach(() => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    gameLobby = new GameLobby();
    pokerTable = PokerTable.createPokerTable('table-1', 2).getValue();
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

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
