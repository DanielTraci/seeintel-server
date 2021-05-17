const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  myDomain: [{type: Schema.Types.ObjectId, ref:'Domain'}]
});

const UserModel = model("User", UserSchema);
module.exports = UserModel;
