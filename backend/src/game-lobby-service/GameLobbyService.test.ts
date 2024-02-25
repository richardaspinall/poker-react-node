import { GameLobbyService } from './GameLobbyService';
import { Rooms } from '../sockets/Rooms';
import { ResultSuccess } from '../shared/Result';

describe('GameLobbyService', () => {
  let gameLobbyService: GameLobbyService;

  beforeEach(() => {
    gameLobbyService = new GameLobbyService();
  });

  describe('getTable', () => {
    it('should get a poker table', () => {
      gameLobbyService.createPokerTable('table_2', 2);

      const table = gameLobbyService.getTable('table_2');
      expect(table?.getName()).toEqual('table_2');
    });

    it('should return undefined if the table does not exist', () => {
      const table = gameLobbyService.getTable('table_2');
      expect(table).toEqual(undefined);
    });
  });

  // TODO: room already exists so need to reset that by mocking the Rooms.createRoom method
  describe('createPokerTable', () => {
    it('should create a poker table', () => {
      jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table_2'));
      gameLobbyService.createPokerTable('table_2', 2);

      const table = gameLobbyService.getTable('table_2');
      expect(table?.getName()).toEqual('table_2');
    });

    it('should return an error if the name is taken', () => {
      gameLobbyService.createPokerTable('table_2', 2);
      const result = gameLobbyService.createPokerTable('table_2', 2);

      expect(result.isError).toEqual(true);
    });
  });
});
