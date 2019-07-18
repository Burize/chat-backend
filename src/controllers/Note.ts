import * as Router from 'koa-router';

import Note, { noteNormalizer, convertNoteToResponse } from '../models/Note';

export const findAll = async (ctx: Router.IRouterContext) => {
  const notes = await Note.find();
  const response = notes.map(convertNoteToResponse);
  ctx.body = JSON.stringify(response);
};

export const find = async (ctx: Router.IRouterContext) => {
  try {
    const id = ctx.params.id;
    const note = await Note.findById(id);
    if (!note) {
      throw Error('Note with specified id is not exist')
    }
    const response = convertNoteToResponse(note);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const create = async (ctx: Router.IRouterContext) => {
  try {
    const note = noteNormalizer(ctx.request.body);
    const createdNote = await Note.create(note);
    const response = convertNoteToResponse(createdNote);
    ctx.body = JSON.stringify(response);
  } catch (e) {
    ctx.throw(400, e.message);
  }
};

export const update = async (ctx: Router.IRouterContext) => {
  try {
    const { id, title, body } = noteNormalizer(ctx.request.body);
    const { n: modifiedCount } = await Note.updateOne({ _id: id }, { title, body }); // TODO: see for other way update
    if (!modifiedCount) {
      throw Error('Note with specified id is not exist')
    }
    ctx.status = 204;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const remove = async (ctx: Router.IRouterContext) => {
  try {
    const { id } = ctx.request.body;
    await Note.deleteOne({ _id: id });
    ctx.status = 204;
  } catch (e) {
    ctx.throw(404, e);
  }
};


export const replaceAll = async (ctx: Router.IRouterContext) => {
  try {
    const notesPayload = ctx.request.body;
    if (!Array.isArray(notesPayload)) {
      throw Error('Request body should be an array of notes');
    }

    const rawNotes = notesPayload.map(noteNormalizer);
    const rawNotesId = rawNotes.map(note => note.id);
    await Note.deleteMany({ _id: { $nin: rawNotesId } });

    const putAwaits = rawNotes.map(async note => {
      const updatedNote = await Note.findOneAndUpdate({ _id: note.id }, note, { upsert: true, new: true });
      return { note: convertNoteToResponse(updatedNote), rawId: note.id };
    });

    const refreshedNotes = await Promise.all(putAwaits);
    ctx.body = JSON.stringify(refreshedNotes);
  } catch (e) {
    ctx.throw(400, e);
  }
};