const mongoose = require("mongoose");

// WORK WITH EQUATION BASED FILES , ( SHOULD SUPPORT CRUD IN BULK AND SINGLE)

//--------  SCHEMA DEFINITION
const CommandsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

CommandsSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
CommandsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}

//--------  MODEL DEFINITION
const CommandsModel = mongoose.model("Commands", CommandsSchema);
module.exports = CommandsModel;
