import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seen: {
    type: Boolean,
    default: [],
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
