const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const AuthoritiesSchema = new mongoose.Schema({
  name: { required: true, type: String, unique: true },
  authrizedUsers: [
    {
      required: false,
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
});

//--------  RELATION DEFINITION
AuthoritiesSchema.virtual("authedUsers", {
  ref: "Users",
  localField: "authrizedUsers",
  foreignField: "_id",
  justOne: false,
});

AuthoritiesSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
AuthoritiesSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}

//--------  MODEL DEFINITION
const AuthoritiesModel = mongoose.model("Authorities", AuthoritiesSchema);
module.exports = AuthoritiesModel;
