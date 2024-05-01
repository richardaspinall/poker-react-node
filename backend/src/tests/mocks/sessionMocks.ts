import { RowDataPacket } from 'mysql2/promise';

import { ResultSuccess } from '@infra/Result';

import { MySqLInstance } from '../../db/my-sql';

export const mockMySqlSelectSessionSuccess = (username: string) => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(
    async () =>
      await new ResultSuccess([
        {
          session_id: 'bcI-pLBR9KclcJ1iPAqSW_93mKMhM0pd',
          session_data: `{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"userId":1, "username":"${username}","authenticated":true}`,
        },
      ] as RowDataPacket[]),
  );
};
