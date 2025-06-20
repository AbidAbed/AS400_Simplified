const mongoose = require("mongoose");

//--------  SCHEMA DEFINITION
const UsersSchema = new mongoose.Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  authCodes: [
    {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: "Authorities",
    },
  ],
});

//--------  RELATION DEFINITION
UsersSchema.virtual("authrizations", {
  ref: "Authorities",
  localField: "authCodes",
  foreignField: "_id",
  justOne: false,
});

UsersSchema.set("toObject", { virtuals: true });
UsersSchema.set("toJSON", { virtuals: true });

//--------  MODEL DEFINITION
const UsersModel = mongoose.model("Users", UsersSchema);
module.exports = UsersModel;
