require('dotenv').config();

// External
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';
import { DBSelectError } from '@shared/errors/DB/DBSelectErrors';
import { DBInsertError, DBInsertDuplicateError } from '@shared/errors/DB/DBInsertErrors';
import { DBDeleteError } from '@shared/errors/DB/DBDeleteErrors';

class MySql {
  private pool: Pool;

  constructor(db_database: string) {
    if (!db_database) throw new Error('No database name provided');
    this.pool = createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: db_database,
    });
  }

  // TODO: Should prefix the queries with the query types
  // e.g. select, insert, update, delete
  // then the params should be the table and the where clauses
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
