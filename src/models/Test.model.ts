import { Schema, model, Types } from "mongoose";

const childSchema = new Schema({
  name: {
    type: String,
  },
});

const parrentSchema = new Schema({
  name: {
    type: String,
  },
  child: {
    type: Types.ObjectId,
    ref: "Child",
  },
});

const Child = model("Child", childSchema);
const Parrent = model("Parrent", parrentSchema);

export { Child, Parrent };
