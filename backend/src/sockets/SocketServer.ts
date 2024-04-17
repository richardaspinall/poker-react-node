import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

import { ClientToServerEvents, ServerToClientEvents } from '@shared/websockets/SocketEvents';

import { Logger } from '../utils/Logger';
import { Sockets } from './Sockets';

const debug = Logger.newDebugger('APP:SocketServer');

/**
 * SocketServer is responsible for managing the socket server
 */
export class SocketServer {
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
      Logger.info('Socket server initialized');
      this.io.on('connection', SocketServer.onConnection);
    } else {
      throw Error('Server already initialized');
    }
  }

  private static async onConnection(socket: Socket) {
    Logger.info(`${socket.id} connected`);

    Sockets.setUpSocket(socket);
  }

  public static sendEventToClient(socket: Socket, event: string, payload: any) {
    socket.emit(event, payload);
  }

  public static async sendEventToRoom(roomId: string, event: string, payload: any) {
    this.io.to(roomId).emit(event, payload);
  }

  public static async logSocketIdsInRoom(roomId: string): Promise<void> {
    const sockets = await this.io.in(roomId).fetchSockets();
    debug(`---SOCKETS IN ${roomId}---`);
    sockets.forEach((socket) => {
      debug(socket.id);
    });
  }
}
