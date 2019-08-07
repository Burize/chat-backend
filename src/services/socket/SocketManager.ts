import * as WebSocket from 'ws';
import { Server } from 'http';
import { IChatMessageController, AllMessages, NewMessage, IMessageEvent, SendedMessage } from './namespace';
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
      const message: AllMessages = { type: 'all_messages', payload: allMessages };
      ws.send(JSON.stringify(message));
    });
  }

  private async onMessage(sender: WebSocket, socketEvent: WebSocket.Data) {
    try {
      if (!isString(socketEvent)) {
        throw 'socket event is not string';
      }

      const event: IMessageEvent = JSON.parse(socketEvent);
      console.log('Incoming data: ' + event);


      const message = await this.controller.saveMessage(event.payload);

      const newMessageEvent: NewMessage = { type: 'new_message', payload: message };
      const sendedMessageEvent: SendedMessage = { type: 'sended_message', payload: message };


      const newMessageEventJSON = JSON.stringify(newMessageEvent);
      const sendedMessageEventJSON = JSON.stringify(sendedMessageEvent);


      this.server.clients.forEach((client) => {

        if (client.readyState !== WebSocket.OPEN) {
          return;
        }
        if (client !== sender) {
          client.send(newMessageEventJSON);
        }
        if (client === sender) {
          client.send(sendedMessageEventJSON);
        }
      });
    } catch (error) {
      console.error(error);
    }

  }
}

export default new SocketManager();