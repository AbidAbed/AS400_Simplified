const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const OptionsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

OptionsSchema.set("toObject", { virtuals: true });
OptionsSchema.set("toJSON", { virtuals: true });

//--------  MODEL DEFINITION
const OptionsModel = mongoose.model("Options", OptionsSchema);
module.exports = OptionsModel;
