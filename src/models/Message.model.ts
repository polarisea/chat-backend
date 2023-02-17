import { Schema, model, Types } from "mongoose";

interface IMessage {
  sender: {
    type: Types.ObjectId;
    ref: "User";
  };
  content: String;
  channel: {
    type: Types.ObjectId;
    ref: "Channel";
  };
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    channel: {
      type: Types.ObjectId,
      ref: "Channel",
    },
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
