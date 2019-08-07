import { IChatMessage } from '../../shared/types/models/chatMessage';

export type AllMessages = IMessageEvent<'all_messages', IChatMessage[]>;
export type NewMessage = IMessageEvent<'new_message', IChatMessage>;
export type SendedMessage = IMessageEvent<'sended_message', IChatMessage>;


export interface IMessageEvent<T extends MessageType = any, P extends object = any> {
  type: T;
  payload: P;
}

export type MessageType = 'all_messages' | 'new_message' | 'sended_message';


export interface IChatMessageController {
  getAllMessages(): Promise<IChatMessage[]>;
  saveMessage(message: unknown): Promise<IChatMessage>;
}