const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
  myNote: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  domain: {type: Schema.Types.ObjectId, ref:'Domain'}
});

const NoteModel = model("Note", NoteSchema);

module.exports = NoteModel;
