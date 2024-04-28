import { BaseOutput } from '../../BaseOutput';

export interface UsersSigninPayload {
  password: string;
  username: string;
}

export interface UsersSigninOutput extends BaseOutput {
  ok: boolean;
}

export enum UsersSigninErrorCodes {
  UsernameNotFoundError = 'username_not_found',
  PasswordInvalidError = 'password_invalid',
}
