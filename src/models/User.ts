import * as mongoose from 'mongoose';
import { isString } from 'util';

export interface IUserModel {
  firstName: string;
  secondName: string;
}

export interface IUserDocument extends mongoose.Document, IUserModel { }

export const UserSchema = new mongoose.Schema<IUserModel>({
  firstName: String,
  secondName: String,
});

export default mongoose.model<IUserDocument>('User', UserSchema);

export function noteNormalizer(user: IUserModel): IUserModel {

  return user;
  // if (!note) {
  //   throw Error('invalid object');
  // }
  // if (!isString(note.title)) {
  //   throw Error('note title must be a string type');
  // }
  // if (!isString(note.body)) {
  //   throw Error('note body must be a string type');
  // }

  // const { title, body, id } = note;
  // return { title, body, id };
}

// export function convertNoteToResponse(note: INoteModel): INote {
//   if (!note) {
//     throw Error(`invalid object when convertNoteToResponse: ${note}`);
//   }
//   if (!isString(note.title)) {
//     throw Error('Note title must be a string type');
//   }
//   if (!isString(note.body)) {
//     throw Error('Note body must be a string type');
//   }

//   const { title, body, _id } = note;
//   return { title, body, id: _id };
// }
