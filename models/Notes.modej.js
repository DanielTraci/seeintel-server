const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  note: {
    type: String,
  }
});

const Note = model("Note", noteSchema);

module.exports = Note;
