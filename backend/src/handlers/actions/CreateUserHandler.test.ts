// External
import request from 'supertest';

// Internal
import { httpServer } from '../../index';
import { shutDownServer } from '@Tests/helpers/shutDownServer';

describe('users.create', () => {
  it('should error when payload is invalid', async () => {
    const res = await request(httpServer).post('/api/actions/users.create').send({
      username: '',
      password: 'abc123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toEqual('INVALID_REQUEST_PAYLOAD');
  });

  it('should create a user', async () => {
    const res = await request(httpServer).post('/api/actions/users.create').send({
      username: 'test',
      password: 'abc123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  // TODO: need to add more unit tests when endpoint is connected to db
//   it('should error when the user credentials are already taken', async () => {
//     await request(httpServer).post('/api/actions/users.create').send({
//         username: 'test',
//         password: 'abc123',
//     });
//     const res = await request(httpServer).post('/api/actions/users.create').send({
//         username: 'test',
//         password: 'abc123',
//     });

//     expect(res.statusCode).toEqual(200);
//     expect(res.body.ok).toEqual(false);
//     expect(res.body.error.message).toEqual('Seat is taken');
//   });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Shut down the server after all tests
  afterAll((done) => {
    (async () => {
      shutDownServer(done);
    })();
  });
});
