import { BaseOutput } from '../../../BaseOutput';

export interface UsersCreatePayload {
  password: string;
  username: string;
}

export interface UsersCreateOutput extends BaseOutput {
  ok: boolean;
}

export enum UsersCreateErrorCodes {
  UsernameTakenError = 'username_taken',
  UsersCreateError = 'users_create_error',
}
