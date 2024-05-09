import { BaseOutput } from '../../../BaseOutput';

export interface UsersGetProfilePayload {}

export interface UsersGetProfileOutput extends BaseOutput {
  ok: boolean;
  profile: {
    username: string;
  };
}

export enum UsersGetProfileErrorCodes {}
