const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const EauationInformationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

EauationInformationsSchema.set("toObject", { virtuals: true });
EauationInformationsSchema.set("toJSON", { virtuals: true });

//--------  MODEL DEFINITION
const EauationInformationsModel = mongoose.model(
  "EauationInformations",
  EauationInformationsSchema
);
module.exports = EauationInformationsModel;
