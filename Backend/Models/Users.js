const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const UsersSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  authCodes: [
    {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "Authorities",
    },
  ],
});

//--------  RELATION DEFINITION
UsersSchema.virtual("authrizations", {
  ref: "Authorities",
  localField: "authCodes",
  foreignField: "_id",
  justOne: false,
});

UsersSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
UsersSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}
//--------  MODEL DEFINITION
const UsersModel = mongoose.model("Users", UsersSchema);
module.exports = UsersModel;
