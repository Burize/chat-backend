import { Model } from 'mongoose';

import { IChatMessageDocument, convertMessageToResponse, convertMessageFromResponse } from '../../models/ChatMessage';
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

  public convertMessage(message: unknown): IChatMessage {
    return convertMessageFromResponse(message);
  }
}