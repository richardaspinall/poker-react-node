require('dotenv').config();

// External
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

// Internal
import { Result, ResultError, ResultSuccess } from '../../infra/Result';
import { DBSelectError } from '../errors/DBSelectErrors';
import { DBInsertError, DBInsertDuplicateError } from '../errors/DBInsertErrors';
import { DBDeleteError } from '../errors/DBDeleteErrors';

/**
 * MySql is responsible for managing the connection to the database and executing queries.
 */
class MySql {
  private pool: Pool = {} as Pool;

  constructor(db_database: string) {
    if (process.env.TEST_RUNNER) {
      this.pool = {} as Pool;
      return;
    }
    if (!db_database) {
      throw new Error('No database name provided');
    }
    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: db_database,
    });
  }

  async select(table: string, whereClause: string[] = [], params: any[] = []): Promise<Result<RowDataPacket[]>> {
    const where =
      whereClause.length > 0 ? `WHERE ${whereClause.map((condition) => `${condition} = ?`).join(' AND ')}` : '';
    const query = `SELECT * FROM ${table} ${where}`;
    try {
      const [rows] = await this.pool.execute<RowDataPacket[]>(query, params);

      return new ResultSuccess(rows);
    } catch (error) {
      return new ResultError(new DBSelectError(table));
    }
  }

  async insert(table: string, columns: string[], params: any[]): Promise<Result<void>> {
    const placeholders = columns.map(() => '?').join(', ');
    const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
    try {
      await this.pool.execute<RowDataPacket[]>(query, params);

      return Result.success();
    } catch (error) {
      const mysqlError = error as Error & { code?: string };

      if (mysqlError.code === 'ER_DUP_ENTRY') {
        return Result.error(new DBInsertDuplicateError(table));
      } else {
        return Result.error(new DBInsertError(table));
      }
    }
  }

  async delete(table: string, whereClause: string[] = [], params: any[] = []): Promise<Result<void>> {
    const where =
      whereClause.length > 0 ? `WHERE ${whereClause.map((condition) => `${condition} = ?`).join(' AND ')}` : '';
    const query = `DELETE FROM ${table} ${where}`;
    try {
      await this.pool.execute(query, params);

      return Result.success();
    } catch (error) {
      return Result.error(new DBDeleteError(table));
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export { MySql };
