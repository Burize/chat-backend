
import * as Router from 'koa-router';
import * as koaSend from 'koa-send';

import { create, auth, find, findAll, update, updateAvatar } from '../controllers/http/User';
import { config } from './config';

const router = new Router();

router.get(`${config.userAvatarPath}(.*)`, async ctx => koaSend(ctx, ctx.path, {
  // root: config.userAvatarPath,
  // immutable: true,
  // maxAge: oneYearMs,
}));

router.get('/note/:id', find);
router.post('/user', create);
router.post('/auth', auth);
router.get('/members/:ids', findAll);
router.patch('/user/:id', update);
router.patch('/user/avatar/:id', updateAvatar);



export const routes = router.routes();
