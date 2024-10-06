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
    console.log("chatid", chatId);

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

    return NextResponse.json({
      success: true,
      messages: chat.messages,
    });

    await pusherServer.trigger("livechat", chatId, chat.messages);

    // return new Response(JSON.stringify(chat.messages), { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
    });
  }
};

// export const POST = async (req, { params }) => {
//   try {
//     await connectToDB();

//     const { chatId } = params;

//     const body = await req.json();

//     const { currentUserId } = body;

//     await Message.updateMany(
//       { chat: chatId },
//       { $addToSet: { seenBy: currentUserId } },
//       { new: true }
//     )
//       .populate({
//         path: "sender seenBy",
//         model: User,
//       })
//       .exec();

//     return new Response("Seen all messages by current user", { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new Response("Failed to update seen messages", { status: 500 });
//   }
// };
