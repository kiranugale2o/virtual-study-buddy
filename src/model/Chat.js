import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  messages: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;
