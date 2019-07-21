import { IChatMessage } from '../../shared/types/models/chatMessage';

export type AllMessages = IMessage<'all_messages', IChatMessage[]>;
export type NewMessage = IMessage<'new_message', IChatMessage>;


export interface IMessage<T extends MessageType = any, P extends object = any> {
  type: T;
  payload: P;
}

export type MessageType = 'all_messages' | 'new_message';


export interface IChatMessageController {
  getAllMessages(): Promise<IChatMessage[]>;
  convertMessage(message: unknown): IChatMessage;
}