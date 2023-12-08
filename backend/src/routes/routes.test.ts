// external modules
import request from 'supertest';

// internal modules
import { httpServer, shutDown } from '../index';
import Logger from '../utils/Logger';

const debug = Logger.newDebugger('test:tables');

describe('tables.create', () => {
  it('should create a new table', async () => {
    const res = await request(httpServer).post('/api/tables/tables.create').send({
      name: 'table_1',
      numSeats: 2,
    });
    expect(res.statusCode).toEqual(200);
  });

  it('should error when only 1 number of seats is provided', async () => {
    const res = await request(httpServer).post('/api/tables/tables.create').send({
      name: 'table_1',
      numSeats: 1,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error_details[0].message).toEqual('"numSeats" must be greater than or equal to 2');
    expect(res.body.error_details[0].context.limit).toEqual(2);
  });

  it('should error when more than 10 number of seats are provided', async () => {
    const res = await request(httpServer).post('/api/tables/tables.create').send({
      name: 'table_1',
      numSeats: 11,
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error_details[0].message).toEqual('"numSeats" must be less than or equal to 10');
    expect(res.body.error_details[0].context.limit).toEqual(10);
  });

  it('should error when the table name is already taken', async () => {
    const res = await request(httpServer).post('/api/tables/tables.create').send({
      name: 'table_1',
      numSeats: 2,
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body.error).toEqual('name_is_taken');
  });

  /**
   *  Cleanup WS & HTTP servers
   */
  afterAll((done) => {
    (async () => {
      try {
        // Execute async operations
        await shutDown();

        // If there are other asynchronous operations, perform them here
        // For example: await SocketServer.close();

        // Once all async operations are complete, call done()
        done();
      } catch (error) {
        // In case of any errors, you can pass them to done
        done(error);
      }
    })();
  });
});
