import { Socket } from 'socket.io';
import SocketServer from './SocketServer';
import Result, { ResultSuccess, ResultError } from '../Result';
import SocketHandlers from './SocketEventHandlers';

export type ClientId = string;

export default class Sockets {
  // For now the socket map is just a map of client id to socket id but we will change this later
  //
  // TODO: This should be `socket.id socket` (<string, Socket>)so we can send messages to specific clients
  //
  // We would then save a reference of the socket.id in the player object to look it up. And then when we
  // sessions, we might change this to a new id that we generate
  private static socketMap = new Map<ClientId, Socket>();

  public static setUpSocket(socket: Socket) {
    Sockets.addSocket(socket.id, socket);
    SocketHandlers.setUpHandlers(socket);
  }

  public static sendEventToClient(clientId: ClientId, event: string, payload: any): Result<void> {
    const res = Sockets.getSocket(clientId);

    if (res.isError) {
      return Result.error(res.errorMessage);
    }

    const socket = res.getValue();

    SocketServer.sendEventToClient(socket, event, payload);

    return Result.success();
  }

  public static getSocket(clientId: ClientId): Result<Socket> {
    const socket = this.socketMap.get(clientId);

    if (socket) {
      return new ResultSuccess(socket);
    }

    return new ResultError('Socket not found');
  }

  private static addSocket(clientId: ClientId, clientSocket: Socket) {
    this.socketMap.set(clientId, clientSocket);
  }

  private static removeSocket(clientId: ClientId) {
    this.socketMap.delete(clientId);
  }
}
