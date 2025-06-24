const mongoose = require("mongoose");

// WORK WITH CIS BASED FILES , ( SHOULD SUPPORT CRUD IN BULK AND SINGLE)


//--------  SCHEMA DEFINITION
const CustomersInformationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//--------  RELATION DEFINITION

CustomersInformationsSchema.set("toObject", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});
CustomersInformationsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: removeId,
});

function removeId(doc, ret) {
  delete ret.id;
  return ret;
}

//--------  MODEL DEFINITION
const CustomersInformationsModel = mongoose.model(
  "CustomersInformations",
  CustomersInformationsSchema
);
module.exports = CustomersInformationsModel;
