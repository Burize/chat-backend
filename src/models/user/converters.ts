import { IUser, IMember, IUserResponse } from '../../shared/types/models/user';
import { IUserModel, IUserDocument } from './User';
import { isString } from 'util';

type UserCreationFields = Exclude<keyof IUser, 'id'>

type UserAuthFields = {
  phone: string;
  password: string;
}


export function convertCreationUserResponse(response: unknown): IUserModel {
  if (!(response instanceof Object)) {
    throw Error(`user credentials is not instanceof Object: ${response}`);
  }

  const user = response as { [key in UserCreationFields]: unknown };

  const { firstName, secondName, phone, password } = user;

  if (!isString(firstName)) {
    throw Error(`firstName is not string when convertMessageFromResponse: ${firstName}`);
  }

  if (!isString(secondName)) {
    throw Error(`secondName is not string when convertMessageFromResponse: ${secondName}`);
  }

  if (!isString(phone)) {
    throw Error(`phone is not string when convertMessageFromResponse: ${phone}`);
  }

  if (!isString(password)) {
    throw Error(`password is not string when convertMessageFromResponse: ${password}`);
  }

  return { firstName, secondName, phone, password: password.trim(), avatar: null };
}

export function convertUserToResponse(user: IUserDocument): IUserResponse {
  const { _id, firstName, secondName, phone, avatar } = user;
  return { id: _id, firstName, secondName, phone, avatar };
}

export function convertMemberToResponse(user: IUserDocument): IMember {
  const { _id, firstName, secondName, avatar } = user;
  return { id: _id, firstName, secondName, avatar }
}

export function convertAuthUserResponse(response: unknown): UserAuthFields {
  if (!(response instanceof Object)) {
    throw Error(`user credentials is not instanceof Object: ${response}`);
  }

  const auth = response as { [key in keyof UserAuthFields]: unknown };

  const { phone, password } = auth;

  if (!isString(phone)) {
    throw Error(`phone is not string when convertMessageFromResponse: ${phone}`);
  }

  if (!isString(password)) {
    throw Error(`password is not string when convertMessageFromResponse: ${password}`);
  }

  return { phone, password: password.trim() };
}


export function convertUserUpdateFields(response: unknown): Partial<IUserModel> {

  if (!(response instanceof Object)) {
    throw Error(`user credentials is not instanceof Object: ${response}`);
  }

  const fields = response as { [key in keyof IUserModel]?: unknown };

  const { firstName, secondName, phone } = fields;

  if (firstName && !isString(firstName)) {
    throw Error(`firstName is not string when convertMessageFromResponse: ${firstName}`);
  }

  if (secondName && !isString(secondName)) {
    throw Error(`secondName is not string when convertMessageFromResponse: ${secondName}`);
  }

  if (phone && !isString(phone)) {
    throw Error(`phone is not string when convertMessageFromResponse: ${phone}`);
  }

  const maybeFields = { firstName, secondName, phone } as Partial<IUserModel>;
  Object.keys(maybeFields).forEach((key: keyof IUserModel) => !maybeFields[key] && delete maybeFields[key]);

  return { ...maybeFields };
}
