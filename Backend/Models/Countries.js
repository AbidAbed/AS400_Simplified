const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const CountriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableUnitsIds: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Units" },
  ],
  ip: { type: String, required: true },
  ultimateUserName: { type: String, required: true },
  ultimateUserPass: { type: String, required: true },
});

//--------  RELATION DEFINITION

CountriesSchema.virtual("units", {
  ref: "Units",
  localField: "availableUnitsIds",
  foreignField: "_id",
  justOne: false,
});

CountriesSchema.set("toObject", { virtuals: true });
CountriesSchema.set("toJSON", { virtuals: true });

//--------  MODEL DEFINITION
const CountriesModel = mongoose.model("Countries", CountriesSchema);
module.exports = CountriesModel;
