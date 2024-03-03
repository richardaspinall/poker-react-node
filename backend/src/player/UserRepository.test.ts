import { MySqLInstance } from '../db/MySql/index';
import { UserRepository } from './UserRepository';
import { Result } from '@shared/Result';
import { DBInsertError } from '@shared/errors/DB/DBInsertErrors';

export const mockMySqlInsertError = () => {
  jest.spyOn(MySqLInstance, 'insert').mockImplementation(async () => await Result.error(new DBInsertError('players')));
};

export const mockMySqlInsertSuccess = () => {
  jest.spyOn(MySqLInstance, 'insert').mockImplementation(async () => await Result.success());
};

export const mockMySqlSelectError = () => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(async () => await Result.error(new DBInsertError('players')));
};

export const mockMySqlSelectSuccess = () => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(async () => await Result.success());
};

describe('MySql', () => {
  //   describe('select', () => {
  //     it('should select player 1000', async () => {
  //       const [player] = await mySql.select('SELECT * FROM players WHERE player_id = ?', [1000]);

  //       expect(player).toEqual({ password: 'testpassword', player_id: 1000, username: 'raspinall' });
  //     });
  //   });

  describe('insert', () => {
    // it('should insert a new player', async () => {
    //   const insertRows = await mySql.insert('INSERT INTO players (username, password) VALUES (?, ?)', [
    //     'jimmy',
    //     'testpassword',
    //   ]);

    //   expect(insertRows.affectedRows).toEqual(1);
    // });
    it('should insert a new player', async () => {
      mockMySqlInsertSuccess();
      const userId = await UserRepository.createUser({ username: 'jknakjbn', password: 'testpassword' });
      console.log('USERID', userId);
      const user = await UserRepository.getUserById(userId);
      expect(user?.getName()).toEqual('jknakjbn');

      await UserRepository.deleteUser(userId);
    });

    // it('should return a duplicate entry error when entering a used username', async () => {
    //     const userId = await UserRepository.createUser({ username: 'james', password: 'testpassword' });

    //   expect(result.code).toEqual('ER_DUP_ENTRY');
    // });
  });

  //   describe('delete', () => {
  //     it('should delete a player', async () => {
  //       const result = await mySql.delete('DELETE FROM players WHERE username = ?', ['james']);

  //       expect(result.affectedRows).toEqual(1);
  //     });
  //   });

  afterAll(async () => {
    // Close the database connection
    await MySqLInstance.close();
    console.log('CLOSED');
  });
});
