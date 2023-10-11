import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

import GameSockets, { ClientToServerEvents, ServerToClientEvents } from './GameSockets';

export default class SocketServer {
  private static io: IOServer;

  public static getInstance() {
    return SocketServer.io;
  }

  public static initialize(httpServer: HttpServer) {
    if (!SocketServer.io) {
      // Create the socket server with the event types for typing
      this.io = new IOServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
        cors: { origin: '*' },
      });

      this.io.on('connection', SocketServer.onConnection);
    } else {
      throw Error('Server already initialized');
    }
  }

  private static onConnection(socket: Socket) {
    console.log('connected');

    // response is a callback function that can be used to send data back to the client
    socket.on('hello_from_client', (value: string, response) => {
      console.log(value);
      response(200);
    });

    socket.emit('hello_from_server');
    GameSockets.setupSocket(socket);
  }
}
