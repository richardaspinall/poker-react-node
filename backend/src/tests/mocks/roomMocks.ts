// Internal
import { Result, ResultSuccess, ResultError } from '@infra/Result';
import { Rooms } from '../../sockets/Rooms';
import { RoomNotFoundError } from '../../sockets/errors/RoomErrors';

export const mockCreateRoomSuccess = (roomId: string) => {
  jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess(roomId));
};

export const mockJoinRoomSuccess = () => {
  jest.spyOn(Rooms, 'joinRoom').mockImplementation(() => Result.success());
};

export const mockJoinRoomError = () => {
  jest.spyOn(Rooms, 'joinRoom').mockImplementation(() => new ResultError(new RoomNotFoundError('room_1')));
};

export const mockSendEventToRoomSuccess = () => {
  jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
};

export const mockSendEventToRoomError = () => {
  jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError(new RoomNotFoundError('room_1')));
};
