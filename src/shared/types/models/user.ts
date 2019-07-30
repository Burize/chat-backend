import { IUserModel } from '../../../models/user';

export interface IUser extends IUserModel {
  id: string;
}

export interface IPartialUser extends Omit<IUserModel, 'phone' | 'password'> {
  id: string;
}