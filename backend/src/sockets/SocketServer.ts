import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

import GameSockets from './Sockets';
import { ClientToServerEvents, ServerToClientEvents } from './SocketEvents';

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

  public static sendEventToClient(socket: Socket, event: string, payload: any) {
    socket.emit(event, payload);
  }

  public static sendEventToRoom(roomId: string, event: string, payload: any) {
    this.io.to(roomId).emit(event, payload);
  }

  private static onConnection(socket: Socket) {
    console.log('connected');

    SocketServer.sendEventToClient(socket, 'hello_from_server', null);
    GameSockets.setUpSocket(socket);
  }
}
