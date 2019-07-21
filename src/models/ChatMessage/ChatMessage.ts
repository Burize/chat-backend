import * as mongoose from 'mongoose';

export interface IChatMessageModel {
  body: string;
  createdAt: number;
  userId: string;
}

export interface IChatMessageDocument extends mongoose.Document, IChatMessageModel { }

export const ChatMessageSchema = new mongoose.Schema<IChatMessageModel>({
  body: String,
  createdAt: Number,
  userId: String,
});

export const ChatMessageModel = mongoose.model<IChatMessageDocument>('ChatMessage', ChatMessageSchema, 'messages');