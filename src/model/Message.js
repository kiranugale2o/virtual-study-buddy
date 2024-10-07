import { formatDateforLastSeen } from "@/utils";
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
  time: {
    type: String,
  },
  seen: {
    type: Boolean,
    default: [],
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
