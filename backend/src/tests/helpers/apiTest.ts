// Internal
import request from 'supertest';
import { httpServer } from '../../index';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';

export async function apiTest(endpoint: string, payload: any) {
  mockMySqlSelectSessionSuccess();

  return await request(httpServer)
    .post(endpoint)
    .set('Cookie', ['connect.sid=s%3AbcI-pLBR9KclcJ1iPAqSW_93mKMhM0pa.zzBmloQUPbqNiCGkSZ4KwoBOkcnWFUOhquX8Y%2BGAz40'])
    .send(payload);
}
