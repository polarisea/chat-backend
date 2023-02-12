import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    default: "No name",
  },
  id: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("accounts", schema);

export { Account };
