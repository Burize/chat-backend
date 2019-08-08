import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as http from 'http';
import * as bodyparser from 'koa-bodyparser';
import * as mongoose from 'mongoose';

import { config } from './config';
import { logger } from './logging';

import SocketManager from '../services/socket/SocketManager';
import ChatMessagesController from '../controllers/plain/ChatMessagesController';
import { ChatMessageModel } from '../models/chatMessage';
import { routes, notProtectedRouts } from './routes';
import { auth } from '../middlewares/auth';

const app = new Koa();
const server = http.createServer(app.callback());

SocketManager.init({ server, controller: new ChatMessagesController(ChatMessageModel) });

app.use(cors());
app.use(logger);
app.use(auth(notProtectedRouts));
app.use(bodyparser({ jsonLimit: '50mb' }));
app.use(routes);

server.listen(config.port, config.host);

mongoose.connect(config.dbPath);

console.log(`Server running on port ${config.port}`);
