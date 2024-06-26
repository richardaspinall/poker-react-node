import { Socket } from 'socket.io';

import { Result, ResultError, ResultSuccess } from '@infra/Result';
import { ServerToClientEventParams, ServerToClientEvents } from '@shared/websockets/WebsocketEvents';

import { Logger } from '../utils/Logger';
import { Rooms } from './Rooms';
import { SocketHandlers } from './SocketEventHandlers';
import { SocketServer } from './SocketServer';
import { SocketNotFoundError } from './errors/SocketErrors';

export type ClientId = string;

/**
 * Sockets is responsible for managing sockets
 */
export class Sockets {
  // For now the socket map is just a map of client id to socket id but we will change this later
  //
  // We would save a reference of the socket.id in the player object to look it up. And then when we get to
  // sessions, we will change this to a new id that we generate
  private static socketMap = new Map<ClientId, Socket>();

  public static setUpSocket(socket: Socket) {
    Sockets.addSocket(socket.request.session.id, socket);
    SocketHandlers.setUpHandlers(socket);
  }

  public static sendEventToClient<E extends keyof ServerToClientEvents>(
    clientId: ClientId,
    event: E,
    payload: ServerToClientEventParams<E>,
  ): Result<void> {
    const res = Sockets.getSocket(clientId);

    if (res.isError()) {
      return Result.error(res.getError());
    }

    const socket = res.getValue();

    SocketServer.sendEventToClient(socket, event, payload);

    return Result.success();
  }

  public static getSocket(clientId: ClientId): Result<Socket> {
    const socket = Sockets.socketMap.get(clientId);

    if (socket) {
      return new ResultSuccess(socket);
    }

    return new ResultError(new SocketNotFoundError());
  }

  private static addSocket(clientId: ClientId, clientSocket: Socket) {
    if (clientId !== undefined) {
      Sockets.socketMap.set(clientId, clientSocket);
    }

    const joinRoomRes = Rooms.joinRoom('table_1', clientSocket);
    if (joinRoomRes.isError()) {
      Logger.error(joinRoomRes.getError().code);
      return;
    }

    const sendEventRes = Rooms.sendEventToRoom('table_1', 'hello_from_server', { clientId: clientId });
    if (sendEventRes.isError()) {
      Logger.error(sendEventRes.getError().code);
      return;
    }
  }

  public static removeSocket(clientId: ClientId) {
    Sockets.socketMap.delete(clientId);
  }
}
