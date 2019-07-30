import { IUser, IPartialUser } from '../../shared/types/models/user';
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

  return { firstName, secondName, phone, password, hasAvatar: false };
}

export function convertUserToResponse(user: IUserDocument): IUser {
  const { _id, firstName, secondName, phone, password, hasAvatar } = user;
  return { id: _id, firstName, secondName, phone, password, hasAvatar }
}

export function convertPartialUserToResponse(user: IUserDocument): IPartialUser {
  const { _id, firstName, secondName, hasAvatar } = user;
  return { id: _id, firstName, secondName, hasAvatar }
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

  return { phone, password };
}


export function convertUserUpdateFields(response: unknown): Partial<IUserModel> {

  if (!(response instanceof Object)) {
    throw Error(`user credentials is not instanceof Object: ${response}`);
  }

  const fields = response as { [key in keyof IUserModel]?: unknown };

  const { firstName, secondName, phone, password } = fields;

  if (firstName && !isString(firstName)) {
    throw Error(`firstName is not string when convertMessageFromResponse: ${firstName}`);
  }

  if (secondName && !isString(secondName)) {
    throw Error(`secondName is not string when convertMessageFromResponse: ${secondName}`);
  }

  if (phone && !isString(phone)) {
    throw Error(`phone is not string when convertMessageFromResponse: ${phone}`);
  }

  if (password && !isString(password)) {
    throw Error(`password is not string when convertMessageFromResponse: ${password}`);
  }

  const maybeFields = { firstName, secondName, phone, password } as Partial<IUserModel>;
  Object.keys(maybeFields).forEach((key: keyof IUserModel) => !maybeFields[key] && delete maybeFields[key]);

  return { ...maybeFields };
}
