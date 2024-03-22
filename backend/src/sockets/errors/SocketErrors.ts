import { BaseError } from '@Infra/Result';

export class SocketNotFoundError extends BaseError {
  constructor() {
    super('socket_not_found', 'Socket not found');
  }
}
