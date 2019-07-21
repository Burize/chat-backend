import * as WebSocket from 'ws';
import { Server } from 'http';
import { IChatMessageController, AllMessages, NewMessage, IMessage } from './namespace';
import { isString } from 'util';

interface InitArgs {
  server: Server;
  controller: IChatMessageController;
}

class SocketManager {
  private server: WebSocket.Server;
  private controller: IChatMessageController;

  public init({ server, controller }: InitArgs) {
    this.controller = controller;
    this.server = new WebSocket.Server({ server: server });
    this.server.on('connection', async ws => {
      ws.on('message', this.onMessage.bind(this, ws));

      const allMessages = await this.controller.getAllMessages();
      console.log('allMessages', allMessages);
      const message: AllMessages = { type: 'all_messages', payload: allMessages };
      ws.send(JSON.stringify(message));
    });
  }

  private onMessage(sender: WebSocket, socketEvent: WebSocket.Data) {

    if (!isString(socketEvent)) {
      throw 'socket event is not string';
    }

    const event: IMessage = JSON.parse(socketEvent);
    console.log('Incoming data: ' + event);


    const message = this.controller.convertMessage(event.payload);
    // message add to DB

    const newMessageEvent: NewMessage = { type: 'new_message', payload: message };
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== sender) {
        client.send(JSON.stringify(newMessageEvent));
      }
    });
  }
}

export default new SocketManager();