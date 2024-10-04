// pages/api/sendMessage.js
import { ConversationModel, MessageModel } from "@/model/ConverstationModel";
import { Student } from "@/model/StudentProfile";
import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1875413",
  key: "4eaa06251960e1a80490",
  secret: "6a2b8f796e64bb91276e",
  cluster: "ap2",
  useTLS: true,
});

export async function POST(req) {
  const { message, senderId, receiverId } = await req.json();
  //find userDetails
  const user = await Student.findOne({ _id: senderId });
  //get
  const getConversationMessage = await ConversationModel.findOne({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  })
    .populate("messages")
    .sort({ updatedAt: -1 });

  pusher.trigger("chat", `message${receiverId}`, {
    userName: user?.fullName,
    message: getConversationMessage?.messages,
  });

  const newMsg = await MessageModel.create({
    text: message,
    msgByUserId: senderId,
  });

  //find user
  let conversation = await ConversationModel.findOne({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });

  //if conversation is not available
  if (!conversation) {
    const createConversation = await ConversationModel({
      sender: senderId,
      receiver: receiverId,
    });
    conversation = await createConversation.save();
  }
  //push
  const updateConversation = await ConversationModel.updateOne(
    { _id: conversation?._id },
    {
      $push: { messages: newMsg?._id },
    }
  );
  return NextResponse.json({ message: "Message sent" });
}
