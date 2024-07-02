import { BaseOutput } from '../../../BaseOutput';

export interface UsersSigninPayload {
  password: string;
  username: string;
}

export interface UsersSigninOutput extends BaseOutput {
  ok: boolean;
}

export enum UsersSigninErrorCodes {
  UsernameNotFoundError = 'USERNAME_NOT_FOUND',
  PasswordInvalidError = 'PASSWORD_INVALID',
}
