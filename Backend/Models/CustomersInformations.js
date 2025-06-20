const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const CustomersInformationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

CustomersInformationsSchema.set("toObject", { virtuals: true });
CustomersInformationsSchema.set("toJSON", { virtuals: true });

//--------  MODEL DEFINITION
const CustomersInformationsModel = mongoose.model("CustomersInformations", CustomersInformationsSchema);
module.exports = CustomersInformationsModel;
