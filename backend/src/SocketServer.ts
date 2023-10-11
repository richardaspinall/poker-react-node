import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

import { ClientToServerEvents, ServerToClientEvents } from './Types';

export default class SocketServer {
  private static io: IOServer;

  public static getInstance() {
    return SocketServer.io;
  }

  public static initialize(httpServer: HttpServer) {
    if (!this.io) {
      // Create the socket server with the event types for typing
      this.io = new IOServer<ClientToServerEvents, ServerToClientEvents>(httpServer, {
        cors: { origin: '*' },
      });

      const onConnection = (socket: Socket) => {
        console.log('connected');

        socket.emit('hello_from_server');

        // response is a callback function that can be used to send data back to the client
        socket.on('hello_from_client', (value: string, response) => {
          console.log(value);
          response(200);
        });

        socket.on('disconnect', (reason: string) => {
          console.log('disconnected');
        });
      };

      this.io.on('connection', onConnection);
    } else {
      throw Error('Server already initialized');
    }
  }
}
