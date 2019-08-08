
import * as Router from 'koa-router';
import * as koaSend from 'koa-send';

import { create, auth, find, findAll, update, updateAvatar, getAccount } from '../controllers/http/User';
import { config } from './config';

export const notProtectedRouts = [
  { method: 'post', path: '/auth' },
  { method: 'post', path: '/user' },
]


const router = new Router();

router.get(`/${config.userAvatarPath}(.*)`, async ctx => koaSend(ctx, ctx.path));

router.get('/user/me', getAccount);
router.get('/user/:id', find);
router.post('/user', create);
router.post('/auth', auth);
router.get('/members/:ids', findAll);
router.patch('/user', update);
router.patch('/user/avatar', updateAvatar);



export const routes = router.routes();
