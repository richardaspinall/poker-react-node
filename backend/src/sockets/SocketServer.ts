// External modules
import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

// Internal modules
import GameSockets from './Sockets';
import Logger from '../utils/Logger';

// Types
import { ClientToServerEvents, ServerToClientEvents } from './SocketEvents';

const debug = Logger.newDebugger('APP:SocketServer');

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
      Logger.info('Socket server initialized');
      this.io.on('connection', SocketServer.onConnection);
    } else {
      throw Error('Server already initialized');
    }
  }

  private static async onConnection(socket: Socket) {
    Logger.info(`${socket.id} connected`);

    // SocketServer.sendEventToClient(socket, 'hello_from_server', null);
    GameSockets.setUpSocket(socket);
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
