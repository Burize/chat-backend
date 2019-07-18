
import * as Router from 'koa-router';

import { create, find, findAll, remove, update, replaceAll } from '../controllers/Note';

const router = new Router();

router.get('/notes', findAll);
router.get('/note/:id', find);
router.post('/note', create);
router.patch('/note', update);
router.delete('/note', remove);
router.put('/notes/refresh', replaceAll);


export const routes = router.routes();
