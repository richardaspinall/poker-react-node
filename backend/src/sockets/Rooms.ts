import { Socket } from 'socket.io';

import { Result, ResultError, ResultSuccess } from '@infra/Result';

import { SocketServer } from './SocketServer';
import { RoomAlreadyExistsError, RoomNotFoundError } from './errors/RoomErrors';

export type RoomId = string;

/**
 * Rooms is responsible for managing rooms in the socket server
 */
export class Rooms {
  // The second string might be removed later (and a set used instead)
  private static roomMap = new Map<RoomId, string>();

  public static createRoom(roomId: RoomId): Result<RoomId> {
    if (!this.roomMap.has(roomId)) {
      this.roomMap.set(roomId, roomId);
      return new ResultSuccess(roomId);
    }
    return new ResultError(new RoomAlreadyExistsError());
  }

  public static joinRoom(roomId: RoomId, socket: Socket): Result<void> {
    const roomRes = this.getRoom(roomId);
    if (roomRes.isError()) {
      return Result.error(roomRes.getError());
    }
    const room = roomRes.getValue();

    socket.join(room);
    return Result.success();
  }

  public static sendEventToRoom<TPayload>(roomId: RoomId, event: string, payload: TPayload): Result<void> {
    const roomRes = this.getRoom(roomId);
    if (roomRes.isError()) {
      return Result.error(roomRes.getError());
    }
    const room = roomRes.getValue();
    SocketServer.sendEventToRoom(room, event, payload);
    return Result.success();
  }

  public static getRoom(roomId: RoomId): Result<RoomId> {
    if (this.roomMap.has(roomId)) {
      return new ResultSuccess(roomId);
    }
    return new ResultError(new RoomNotFoundError(roomId));
  }

  private static leaveRoom(roomId: RoomId, socket: Socket): Result<void> {
    const roomRes = this.getRoom(roomId);

    if (roomRes.isError()) {
      return Result.error(roomRes.getError());
    }

    const room = roomRes.getValue();

    socket.leave(room);
    return Result.success();
  }

  private static deleteRoom(roomId: RoomId): Result<void> {
    const res = this.roomMap.delete(roomId);

    if (res) {
      return Result.success();
    }
    return Result.error(new RoomNotFoundError(roomId));
  }
}
