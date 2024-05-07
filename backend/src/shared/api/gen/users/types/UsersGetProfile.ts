import { BaseOutput } from '../../../BaseOutput';

export interface UsersGetProfilePayload {}

export interface UsersGetProfileOutput extends BaseOutput {
  ok: boolean;
  username: string;
}

export enum UsersGetProfileErrorCodes {}
