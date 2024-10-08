import DatabaseConn from "@/database";
import { pusherServer } from "@/helpers/pusher";
import Chat from "@/model/Chat";
import Message from "@/model/Message";
import { Student } from "@/model/StudentProfile";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await DatabaseConn();

    const { chatId } = await req.json();

    const chat = await Chat.findOne({ _id: chatId })
      .populate({
        path: "senderId",
        model: Student,
      })
      .populate({
        path: "receiverId",
        model: Student,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: Student,
        },
      })
      .exec();

    const channelName = "chat"; // You can also make this dynamic based on your logic

    return NextResponse.json({
      success: true,
      messages: chat.messages,
    });

    // return new Response(JSON.stringify(chat.messages), { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
    });
  }
};
