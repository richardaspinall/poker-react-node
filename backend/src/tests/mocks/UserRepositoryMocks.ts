import { ResultSuccess } from '@infra/Result';

import { UserRepository } from '../../users/UserRepository';

export const mockUserRepositoryGetPasswordSuccess = () => {
  jest.spyOn(UserRepository, 'getPassword').mockImplementation(async () => await new ResultSuccess('testpassword'));
};
