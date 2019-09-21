import { IUserModel } from '../../../models/user';

export interface IUser extends IUserModel {
  id: string;
}

export type IUserResponse = Omit<IUser, 'password'>;

export type IMember = Omit<IUser, 'phone' | 'password'>;
