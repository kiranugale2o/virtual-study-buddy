import DatabaseConn from "@/database";
import { pusherServer } from "@/helpers/pusher";
import Chat from "@/model/Chat";
import Message from "@/model/Message";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await DatabaseConn();

    const body = await req.json();
    let ConchatId;
    const { senderId, text, photo, chatId, time } = body;
    console.log(chatId);

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
      ConchatId = getConversationMessage?._id;
    } else {
      const createConversation = await Chat({
        senderId: senderId,
        receiverId: chatId,
        messages: newMsg?._id,
      });

      await createConversation.save();
      ConchatId = createConversation?._id;
    }

    const channelName = "chat"; // You can also make this dynamic based on your logic
    const eventName = `message${ConchatId}`;
    await pusherServer.trigger("chat", eventName, newMsg);
    console.log("messss", newMsg);

    return NextResponse.json({
      success: true,
    });
    /* Trigger a Pusher event for a specific chat about the new message */
    //await pusherServer.trigger(chatId, "new-message", newMsg);

    /* Triggers a Pusher event for each member of the chat about the chat update with the latest message */
    // const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
    });
  }
};
