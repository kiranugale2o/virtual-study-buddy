import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: String,
  buddyId: String,
  chat: [{}],
});

export const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
