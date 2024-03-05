import { BaseError } from '@Infra/Result';

export class SocketNotFoundError extends BaseError {
  constructor() {
    super('SOCKET_NOT_FOUND', 'Socket not found');
  }
}
