const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const OptionsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

OptionsSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
OptionsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}

//--------  MODEL DEFINITION
const OptionsModel = mongoose.model("Options", OptionsSchema);
module.exports = OptionsModel;
