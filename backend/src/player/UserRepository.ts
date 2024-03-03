// Internal
import { MySqLInstance as DB } from '../db/MySql';
import { User } from './User';
interface NewUserDTO {
  username: string;
  password: string;
}

export class UserRepository {
  static async createUser(userDTO: NewUserDTO): Promise<number> {
    const insertRows = await DB.insert('INSERT INTO players (username, password) VALUES (?, ?)', [
      userDTO.username,
      userDTO.password,
    ]);
    console.log('HERE', insertRows);
    const rows = await DB.select('SELECT * FROM players WHERE username = ?', [userDTO.username]);
    console.log(rows);
    return rows[0].player_id;
  }

  static async getUserById(id: number): Promise<User | null> {
    const rows = await DB.select('SELECT * FROM players WHERE player_id = ?', [id]);
    if (rows.length) {
      return new User(rows[0].username, rows[0].player_id);
    }
    return null;
  }

  static async deleteUser(id: number): Promise<void> {
    const deleteRows = await DB.delete('DELETE FROM players WHERE player_id = ?', [id]);
    console.log(deleteRows);
  }
}
