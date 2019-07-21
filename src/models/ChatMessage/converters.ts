import { IChatMessageDocument } from './ChatMessage';
import { IChatMessage } from '../../shared/types/models/chatMessage';
import { isString, isNumber } from 'util';

export function convertMessageToResponse(message: IChatMessageDocument): IChatMessage {
  if (!message) {
    throw Error(`invalid object when convertNoteToResponse: ${message}`);
  }

  const { _id, userId, createdAt, body, } = message;
  return { id: _id, userId, createdAt, body };
}



export function convertMessageFromResponse(message: unknown): IChatMessage {

  if (!(message instanceof Object)) {
    throw Error(`message is not instanceof Object: ${message}`);
  }

  const id = 'id' in message && message['id'] as unknown;
  const userId = 'userId' in message && message['userId'] as unknown;
  const body = 'body' in message && message['body'] as unknown;
  const createdAt = 'createdAt' in message && message['createdAt'] as unknown;


  if (!isString(id)) {
    throw Error(`id is not string when convertMessageFromResponse: ${message}`);
  }

  if (!isString(userId)) {
    throw Error(`userId is not string when convertMessageFromResponse: ${message}`);
  }

  if (!isString(body)) {
    throw Error(`body is not string when convertMessageFromResponse: ${message}`);
  }

  if (!isNumber(createdAt)) {
    throw Error(`createdAt is not number when convertMessageFromResponse: ${message}`);
  }

  return { id, userId, body, createdAt };
}