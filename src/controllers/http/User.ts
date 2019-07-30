import * as Router from 'koa-router';
import * as base64Img from 'base64-img';
import { UserModel, convertCreationUserResponse, convertUserToResponse, convertAuthUserResponse, IUserDocument, convertPartialUserToResponse, convertUserUpdateFields } from '../../models/user';
import { config } from '../../core/config';

export const find = async (ctx: Router.IRouterContext) => {
  try {
    const id = JSON.parse(ctx.params.id);
    const user = await UserModel.findOne({ _id: id });
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
    const response = convertUserToResponse(user);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(401, e);
  }
};

export const create = async (ctx: Router.IRouterContext) => {
  try {
    const note = convertCreationUserResponse(ctx.request.body);
    const createdNote = await UserModel.create(note);
    const response = convertUserToResponse(createdNote);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(400, e.message);
  }
};

export const update = async (ctx: Router.IRouterContext) => {
  try {
    const fieldsForUpdate = convertUserUpdateFields(ctx.request.body);
    const id = ctx.params.id;
    const { n: modifiedCount } = await UserModel.updateOne({ _id: id }, { ...fieldsForUpdate }); // TODO: see for other way update
    if (!modifiedCount) {
      throw Error('Could not find user for update')
    }

    const user = await UserModel.findOne({ _id: id });
    const response = convertUserToResponse(user);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateAvatar = async (ctx: Router.IRouterContext) => {
  try {
    const id: string = ctx.params.id;
    const base64Avatar: string = ctx.request.body.avatar;

    var filePath = base64Img.imgSync(base64Avatar, config.userAvatarPath, id);

    const { n: modifiedCount } = await UserModel.updateOne({ _id: id }, { avatar: filePath }); // TODO: see for other way update
    if (!modifiedCount) {
      throw Error('Could not find user for update')
    }

    // const user = await UserModel.findOne({ _id: id });
    // const response = convertUserToResponse(user);
    // ctx.body = JSON.stringify(response);
    ctx.body = 200;
  } catch (e) {
    ctx.throw(400, e);
  }
};
