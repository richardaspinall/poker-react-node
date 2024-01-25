// roomMocks.js
import Rooms from '../../sockets/Rooms';

import Result, { ResultSuccess, ResultError } from '../../shared/Result';

export const mockCreateRoomSuccess = (roomId: string) => {
  jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess(roomId));
};

export const mockJoinRoomSuccess = () => {
  jest.spyOn(Rooms, 'joinRoom').mockImplementation(() => Result.success());
};

export const mockJoinRoomError = () => {
  jest.spyOn(Rooms, 'joinRoom').mockImplementation(() => new ResultError('Mocked error'));
};

export const mockSendEventToRoomSuccess = () => {
  jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
};

export const mockSendEventToRoomError = () => {
  jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError('Room not found'));
};
