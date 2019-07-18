import * as mongoose from 'mongoose';
import { isString } from 'util';

interface INote {
  id?: mongoose.Document['id'];
  title: string;
  body: string;
}

export interface INoteModel extends mongoose.Document, INote { }

export const NoteSchema = new mongoose.Schema<INote>({
  title: String,
  body: String,
});

export default mongoose.model<INoteModel>('Note', NoteSchema);

export function noteNormalizer(note: INote): INote {
  if (!note) {
    throw Error('invalid object');
  }
  if (!isString(note.title)) {
    throw Error('note title must be a string type');
  }
  if (!isString(note.body)) {
    throw Error('note body must be a string type');
  }

  const { title, body, id } = note;
  return { title, body, id };
}

export function convertNoteToResponse(note: INoteModel): INote {
  if (!note) {
    throw Error(`invalid object when convertNoteToResponse: ${note}`);
  }
  if (!isString(note.title)) {
    throw Error('Note title must be a string type');
  }
  if (!isString(note.body)) {
    throw Error('Note body must be a string type');
  }

  const { title, body, _id } = note;
  return { title, body, id: _id };
}
