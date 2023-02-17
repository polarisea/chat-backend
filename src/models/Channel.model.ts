import { Schema, Types, model } from "mongoose";

interface IChannel {
  channelName: String;
  isGroup: boolean;
  admin: {
    type: Types.ObjectId;
    ref: "User";
  };
  users: [
    {
      type: Types.ObjectId;
      ref: "User";
    }
  ];
  lastMessage: {
    type: Types.ObjectId;
    ref: "Message";
  };
}

const channelSchema = new Schema<IChannel>(
  {
    channelName: {
      type: String,
      trim: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

const Channel = model("Channel", channelSchema);

export default Channel;
