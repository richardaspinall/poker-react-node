import { MySql } from './MySql';

describe('MySql', () => {
  const mySql = new MySql(process.env.DB_DATABASE || '');

  describe('select', () => {
    it('should select player 1000', async () => {
      const resRows = await mySql.select('users', ['user_id'], [1000]);

      resRows.getValue().forEach((row) => {
        expect(row).toEqual({ password: 'testpassword', user_id: 1000, username: 'richard' });
      });
    });
  });

  describe('insert', () => {
    it('should insert a new player', async () => {
      const result = await mySql.insert('users', ['username', 'password'], ['james', 'testpassword']);

      expect(result.isOk()).toEqual(true);
    });

    it('should return a duplicate entry error when entering a used username', async () => {
      const result = await mySql.insert('users', ['username', 'password'], ['james', 'testpassword']);

      expect(result.getError()?.code).toEqual('duplicate_entry');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = await mySql.delete('users', ['username'], ['james']);

      expect(result.isOk()).toEqual(true);
    });
  });

  afterAll(async () => {
    // Close the database connection
    await mySql.close();
  });
});
