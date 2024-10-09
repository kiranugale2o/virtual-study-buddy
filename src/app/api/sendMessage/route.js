import DatabaseConn from "@/database";
import Chat from "@/model/Chat";
import Message from "@/model/Message";
import { Realtime } from "ably";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  console.log({
    appId: "1876708",
    key: "8ffb36d64a0c43c9c044",
    secret: "ddfa095b8efa75b8fd06",
    cluster: "ap2",
    useTLS: true,
  });

  try {
    await DatabaseConn();

    const body = await req.json();
    let ConchatId;
    const { senderId, text, photo, chatId, time } = body;
    console.log(body);

    const newMsg = await Message.create({
      senderId,
      text,
      photo,
      seen: false,
      time,
    });

    const getConversationMessage = await Chat.findOne({
      $or: [
        { senderId: senderId, receiverId: chatId },
        { senderId: chatId, receiverId: senderId },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });

    if (getConversationMessage) {
      const updateConversation = await Chat.updateOne(
        { _id: getConversationMessage?._id },
        {
          $push: { messages: newMsg?._id },
        }
      );
      ConchatId = JSON.parse(JSON.stringify(getConversationMessage))._id;
    } else {
      const createConversation = await Chat({
        senderId: senderId,
        receiverId: chatId,
        messages: newMsg?._id,
      });

      await createConversation.save();
      ConchatId = JSON.parse(JSON.stringify(createConversation))._id;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
    });
  }
};
