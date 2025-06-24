const mongoose = require("mongoose");


// WORK WITH UNITS FOR SPECIFIC COUNTRY

//--------  SCHEMA DEFINITION
const UnitsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

UnitsSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
UnitsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}

//--------  MODEL DEFINITION
const UnitsModel = mongoose.model("Units", UnitsSchema);
module.exports = UnitsModel;
