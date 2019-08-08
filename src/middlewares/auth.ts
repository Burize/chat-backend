import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';

import { config } from '../core/config';
import { IRoute } from '../models/shared';
import { IAuthToken } from '../models/auth';

export function auth(notProtectedRoots: IRoute[]) {


  return async function (ctx: Koa.Context, next: () => Promise<any>) {

    const { method, path, headers } = ctx;

    if (path.includes('/assets/')) {
      await next();
      return;
    }
    const isNotProtected = notProtectedRoots.find(route => route.method === method.toLowerCase() && route.path === path);
    if (isNotProtected) {
      await next();
      return;
    }

    const authHeader: string = headers.authorization;
    if (!authHeader) {
      ctx.throw(401);
    }

    const token = authHeader.match(/Bearer (\S+)/)[1];
    if (!token) {
      ctx.throw(401);
    }

    try {
      jwt.verify(token, config.privateKey);
      var payload = jwt.decode(token, { json: true }) as IAuthToken;
      ctx.state.userId = payload['userId'];
    } catch (err) {
      ctx.throw(401);
    }

    await next();

  };

}
