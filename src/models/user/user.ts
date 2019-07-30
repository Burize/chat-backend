import * as mongoose from 'mongoose';
import { isString } from 'util';
import { IUser } from '../../shared/types/models/user';

export interface IUserModel {
  firstName: string;
  secondName: string;
  phone: string,
  password: string,
  hasAvatar: boolean,
}

export interface IUserDocument extends mongoose.Document, IUserModel { }

export const UserSchema = new mongoose.Schema<IUserModel>({
  firstName: String,
  secondName: String,
  phone: String,
  password: String,
  hasAvatar: Boolean,
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
