const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const UnitsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

UnitsSchema.set("toObject", { virtuals: true });
UnitsSchema.set("toJSON", { virtuals: true });

//--------  MODEL DEFINITION
const UnitsModel = mongoose.model("Units", UnitsSchema);
module.exports = UnitsModel;
