require('dotenv').config();

// External
import { createPool, Pool, RowDataPacket } from 'mysql2/promise';

// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';
import { DBSelectError } from '@shared/errors/DB/DBSelectErrors';
import { DBInsertError, DBInsertDuplicateError } from '@shared/errors/DB/DBInsertErrors';

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
  async select(query: string, params: any[] = []): Promise<Result<RowDataPacket[]>> {
    try {
      const [rows] = await this.pool.execute<RowDataPacket[]>(query, params);
      return new ResultSuccess(rows);
    } catch (error) {
      // const mysqlError = error as Error & { code?: string };
      return new ResultError(new DBSelectError('users'));
    }
  }

  async insert(query: string, params: any[] = []): Promise<Result<void>> {
    try {
      const [result] = await this.pool.execute<RowDataPacket[]>(query, params);
      return Result.success();
    } catch (error) {
      const mysqlError = error as Error & { code?: string };
      if (mysqlError.code === 'ER_DUP_ENTRY') {
        // TODO: add the actual table from the query
        return Result.error(new DBInsertDuplicateError('users'));
      } else {
        return Result.error(new DBInsertError('users'));
      }
    }
  }

  async delete(query: string, params: any[] = []): Promise<any> {
    try {
      const [result] = await this.pool.execute(query, params);
      return result;
    } catch (error) {
      return error;
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export { MySql };
