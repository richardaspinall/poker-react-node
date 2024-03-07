// External
import { Socket } from 'socket.io';

// Internal utils
import { Logger } from '../utils/Logger';
import { ClientToServerEvents, ServerToClientEvents } from './SocketEvents';

const debug = Logger.newDebugger('APP:SocketEventHandlers');

/**
 * SocketHandlers is responsible for handling socket events
 */
export class SocketHandlers {
  static setUpHandlers(socket: Socket<ClientToServerEvents, ServerToClientEvents>) {
    // response is a callback function that can be used to send data back to the client
    socket.on('hello_from_client', (value: string, response) => {
      debug(value);
      response(200);
    });

    socket.on('disconnect', (reason) => {
      debug('disconnected');
      // Handle disconnection logic if needed
    });
  }
}
