import { IChatMessageDocument } from './chatMessage';
import { IChatMessage } from '../../shared/types/models/chatMessage';
import { isString, isNumber } from 'util';

export function convertMessageToResponse(message: IChatMessageDocument): IChatMessage {
  if (!message) {
    throw Error(`invalid object when convertNoteToResponse: ${message}`);
  }

  const { _id, userId, createdAt, body, } = message;
  return { id: _id, userId, createdAt, body };
}

export function convertMessageFromResponse(_message: unknown): Omit<IChatMessage, 'id' | 'createdAt'> {

  if (!(_message instanceof Object)) {
    throw Error(`message is not instanceof Object: ${_message}`);
  }

  const message = _message as Record<keyof IChatMessage, unknown>;

  const { userId, body } = message;

  if (!isString(userId)) {
    throw Error(`userId is not string when convertMessageFromResponse: ${userId}`);
  }

  if (!isString(body)) {
    throw Error(`body is not string when convertMessageFromResponse: ${body}`);
  }

  return { userId, body };
}