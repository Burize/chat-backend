import * as cors from '@koa/cors';
import * as Koa from 'koa';
import * as http from 'http';
import * as bodyparser from 'koa-bodyparser';
import * as mongoose from 'mongoose';

import { config } from './config';
import { logger } from './logging';

import SocketManager from '../services/socket/SocketManager';
import ChatMessagesController from '../controllers/plain/ChatMessagesController';
import { ChatMessageModel } from '../models/ChatMessage';
// import { routes } from './routes';

const app = new Koa();
const server = http.createServer(app.callback());

SocketManager.init({ server, controller: new ChatMessagesController(ChatMessageModel) });

app.use(cors());
app.use(logger);
app.use(bodyparser());
// app.use(routes);

server.listen(config.port, '10.0.0.100');

mongoose.connect(config.dbPath);

console.log(`Server running on port ${config.port}`);
