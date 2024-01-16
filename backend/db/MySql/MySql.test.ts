import MySql from './MySql';

describe('MySql', () => {
  const mySql = new MySql(process.env.DB_DATABASE || '');

  describe('select', () => {
    it('should select player 1000', async () => {
      const [player] = await mySql.select('SELECT * FROM players WHERE player_id = ?', [1000]);

      expect(player).toEqual({ password: 'testpassword', player_id: 1000, username: 'raspinall' });
    });
  });

  describe('insert', () => {
    it('should insert a new player', async () => {
      const result = await mySql.insert('INSERT INTO players (username, password) VALUES (?, ?)', [
        'james',
        'testpassword',
      ]);

      expect(result.affectedRows).toEqual(1);
    });

    it('should return a duplicate entry error when entering a used username', async () => {
      const result = await mySql.insert('INSERT INTO players (username, password) VALUES (?, ?)', [
        'james',
        'testpassword',
      ]);

      expect(result.code).toEqual('ER_DUP_ENTRY');
    });
  });

  describe('delete', () => {
    it('should delete a player', async () => {
      const result = await mySql.delete('DELETE FROM players WHERE username = ?', ['james']);

      expect(result.affectedRows).toEqual(1);
    });
  });

  afterAll(async () => {
    // Close the database connection
    await mySql.close();
  });
});
