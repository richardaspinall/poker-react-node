import { ResultSuccess } from '@infra/Result';

import { User } from '../../users/User';
import { UserService } from '../../users/UserService';

export const mockUserServiceGetUserByIdSuccess = (user: User) => {
  jest.spyOn(UserService, 'getUserById').mockImplementation(async () => await new ResultSuccess(user));
};
