import * as fs from 'fs';
import * as Router from 'koa-router';
import * as base64Img from 'base64-img';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';

import { UserModel, convertCreationUserResponse, convertUserToResponse, convertAuthUserResponse, IUserDocument, convertPartialUserToResponse, convertUserUpdateFields } from '../../models/user';
import { config } from '../../core/config';

export const getAccount = async (ctx: Router.IRouterContext) => {
  try {
    const user = await UserModel.findById(ctx.state.userId);
    if (!user) {
      throw Error('User not found');
    }

    const response = convertUserToResponse(user);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const find = async (ctx: Router.IRouterContext) => {
  try {
    const id: string = ctx.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
      throw Error('User not found');
    }
    const response = convertUserToResponse(user);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const findAll = async (ctx: Router.IRouterContext) => {
  const ids = JSON.parse(ctx.params.ids);
  const users = await UserModel.find({ _id: { $in: ids } });
  const response = users.map(convertPartialUserToResponse);
  ctx.body = JSON.stringify(response);
};

export const auth = async (ctx: Router.IRouterContext) => {
  try {
    const { phone, password } = convertAuthUserResponse(ctx.request.body);
    const user: IUserDocument = await UserModel.findOne({ phone });
    if (!user || user.password !== password) {
      throw Error('Wrong phone number or password');
    }

    var token = jwt.sign({ userId: user.id }, config.privateKey);
    ctx.body = token;
  } catch (e) {
    ctx.throw(401, e);
  }
};

export const create = async (ctx: Router.IRouterContext) => {
  try {
    const user = convertCreationUserResponse(ctx.request.body);

    const duplicate = await UserModel.count({ phone: user.phone });

    if (duplicate !== 0) {
      throw Error('User with specified phone already exist');
    }

    const createdUser = await UserModel.create(user);
    var token = jwt.sign({ userId: createdUser.id }, config.privateKey);
    ctx.body = token;
  } catch (e) {
    ctx.throw(400, e.message);
  }
};

export const update = async (ctx: Router.IRouterContext) => {
  try {
    const fieldsForUpdate = convertUserUpdateFields(ctx.request.body);
    const id = ctx.state.userId;

    if (fieldsForUpdate.phone) {
      const userWithSame = await UserModel.findOne({ phone: fieldsForUpdate.phone });
      if (userWithSame) {
        throw Error('The specified phone number is already in use')
      }
    }

    const { n: modifiedCount } = await UserModel.updateOne({ _id: id }, { ...fieldsForUpdate });
    if (!modifiedCount) {
      throw Error('Could not find user for update')
    }

    const user = await UserModel.findById(id);
    const response = convertUserToResponse(user);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateAvatar = async (ctx: Router.IRouterContext) => {
  try {
    const id: string = ctx.state.userId;
    const base64Avatar: string = ctx.request.body.avatar;

    const user = await UserModel.findById(id);
    const oldAvatar = user.avatar;

    if (!user) {
      throw Error('Could not find user for update')
    }

    var filePath = base64Img.imgSync(base64Avatar, config.userAvatarPath, uuid());

    // TODO: more better if avatar will be only name of file^ without local path
    const { n: modifiedCount } = await UserModel.updateOne({ _id: id }, { avatar: filePath });
    if (!modifiedCount) {
      throw Error('Could not find user for update')
    }

    await fs.unlinkSync(oldAvatar);

    const response = { avatar: filePath }
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(400, e);
  }
};
