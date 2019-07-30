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



export function convertMessageFromResponse(_message: unknown): IChatMessage {

  if (!(_message instanceof Object)) {
    throw Error(`message is not instanceof Object: ${_message}`);
  }

  const message = _message as Record<keyof IChatMessage, unknown>;

  const { id, userId, body, createdAt } = message;

  if (!isString(id)) {
    throw Error(`id is not string when convertMessageFromResponse: ${id}`);
  }

  if (!isString(userId)) {
    throw Error(`userId is not string when convertMessageFromResponse: ${userId}`);
  }

  if (!isString(body)) {
    throw Error(`body is not string when convertMessageFromResponse: ${body}`);
  }

  if (!isNumber(createdAt)) {
    throw Error(`createdAt is not number when convertMessageFromResponse: ${createdAt}`);
  }

  return { id, userId, body, createdAt };
}