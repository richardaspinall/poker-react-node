import { io, Socket } from 'socket.io-client';

import { httpServer, SocketServer, shutDown } from '../index';
import Sockets from './Sockets';

let socket: Socket;
let socketId: string;

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

/**
 * Run before each test
 */
beforeEach((done) => {
  socket = io('http://localhost:3000', {
    autoConnect: true,
  });
  socket.on('connect', () => {
    socketId = socket.id;
    done();
  });
});

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

describe('basic socket.io example', () => {
  test('should communicate', (done) => {
    const ioServer = SocketServer.getInstance();

    // need to change to a helper function
    const res = Sockets.getSocket(socketId);
    const clientId = res.getValue();

    SocketServer.sendEventToClient(clientId, 'echo', 'Hello World');
    socket.on('echo', (message) => {
      try {
        // Check that the message matches
        expect(message).toBe('Hello World');
        done();
      } catch (error) {
        done(error); // Signal Jest that an error occurred
      }
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });
});
