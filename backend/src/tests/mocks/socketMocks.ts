import { Result, ResultError } from '@infra/Result';

import { Sockets } from '../../sockets/Sockets';
import { SocketNotFoundError } from '../../sockets/errors/SocketErrors';

export const mockSendEventToSocketSuccess = () => {
  jest.spyOn(Sockets, 'sendEventToClient').mockImplementation(() => Result.success());
};

export const mockSendEventToSocketError = () => {
  jest.spyOn(Sockets, 'sendEventToClient').mockImplementation(() => new ResultError(new SocketNotFoundError()));
};
