const { Schema, model } = require("mongoose");

const SavedResultSchema = new Schema({
  savedItem: {
    type: String,
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  domain: [{type: Schema.Types.ObjectId, ref:'Domain'}]
});

const SavedResult = model("SavedResult", SavedResultSchema);

module.exports = SavedResult;
