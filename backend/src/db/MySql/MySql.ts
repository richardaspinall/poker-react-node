require('dotenv').config();

import { createPool, Pool } from 'mysql2/promise';

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
  async select(query: string, params: any[] = []): Promise<any> {
    try {
      const [rows] = await this.pool.execute(query, params);
      return rows;
    } catch (error) {
      return error;
    }
  }

  async insert(query: string, params: any[] = []): Promise<any> {
    try {
      const [result] = await this.pool.execute(query, params);
      return result;
    } catch (error) {
      return error;
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
