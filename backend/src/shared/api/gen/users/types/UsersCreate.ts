import { BaseOutput } from '../../../BaseOutput';

export interface UsersCreatePayload {
  password: string;
  username: string;
}

export interface UsersCreateOutput extends BaseOutput {
  ok: boolean;
}

export enum UsersCreateErrorCodes {
  UsernameTakenError = 'USERNAME_TAKEN',
  UsersCreateError = 'USERS_CREATE_ERROR',
}
