// External
import { io, Socket } from 'socket.io-client';

// Internal
import { SocketServer } from '../index';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { Sockets } from './Sockets';

let socket: Socket;
let socketId: string | undefined;

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
    if (socketId === undefined) {
      throw new Error('socketId is undefined');
    }
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

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  (async () => {
    shutDownServer(done);
  })();
});
