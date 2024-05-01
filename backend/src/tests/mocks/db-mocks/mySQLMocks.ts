import { MySqLInstance } from '../../../db/my-sql';

export const mockMySqlClose = () => {
  jest.spyOn(MySqLInstance, 'close').mockImplementation(async () => {});
};
