import { Model } from 'mongoose';

import { IChatMessageDocument, convertMessageToResponse, convertMessageFromResponse } from '../../models/chatMessage';
import { IChatMessageController } from '../../services/socket/namespace';
import { IChatMessage } from '../../shared/types/models/chatMessage';

export default class ChatMessagesController implements IChatMessageController {
  private chatMessagesModel: Model<IChatMessageDocument>;

  constructor(chatMessagesModel: Model<IChatMessageDocument>) {
    this.chatMessagesModel = chatMessagesModel;
  }

  public async getAllMessages() {
    const allMessages = await this.chatMessagesModel.find();

    return allMessages.map(convertMessageToResponse) as any;
  }

  public async saveMessage(message: unknown): Promise<IChatMessage> {
    const { body, userId } = convertMessageFromResponse(message);
    const createdMessage = await this.chatMessagesModel.create({ body, userId, createdAt: Date.now() });
    return convertMessageToResponse(createdMessage);
  }
}