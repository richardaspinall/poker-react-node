import { ResultSuccess } from '@infra/Result';
import { UsersGetProfileOutput, UsersGetProfilePayload } from '@shared/api/gen/users/types/UsersGetProfile';

import { UserService } from '../../../users/UserService';
import { AbstractUsersGetProfileHandler } from './gen/AbstractUsersGetProfileHandler';

export class UsersGetProfileHandler extends AbstractUsersGetProfileHandler {
  protected async getResult(_payload: UsersGetProfilePayload, userId: number) {
    const userOrError = await UserService.getUserById(userId);

    if (userOrError.isError()) {
      throw userOrError.getError();
    }

    const payload = {
      ok: true,
      username: userOrError.getValue().getUsername(),
    };
    return new ResultSuccess<UsersGetProfileOutput>(payload);
  }
}
