const mongoose = require("mongoose");


// WORK WITH EQUATION BASED FILES , ( SHOULD SUPPORT CRUD IN BULK AND SINGLE)

//--------  SCHEMA DEFINITION
const EauationInformationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

EauationInformationsSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
EauationInformationsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}

//--------  MODEL DEFINITION
const EauationInformationsModel = mongoose.model(
  "EauationInformations",
  EauationInformationsSchema
);
module.exports = EauationInformationsModel;
