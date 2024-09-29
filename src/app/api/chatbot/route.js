// Make sure to include these imports:
import DatabaseConn from "@/database";
import { Chat } from "@/model/Chat";
import { ConversationModel, MessageModel } from "@/model/ConverstationModel";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { userId, buddyId, message } = await req.json();
    console.log(message);

    const msg = await MessageModel.create({
      text: message,
      msgByUserId: userId,
    });
    const conversation = await ConversationModel.findOne({
      $or: [
        { sender: userId, receiver: buddyId },
        { sender: buddyId, receiver: userId },
      ],
    });
    if (conversation) {
      conversation.messages.push(msg._id);
      await conversation.save();

      return NextResponse.json({
        success: true,
        message: "suceess",
      });
    } else {
      const newConver = await ConversationModel.create({
        sender: userId,
        receiver: buddyId,
        messages: msg._id,
      });
      if (newConver) {
        return NextResponse.json({
          success: true,
          message: "suceess new ",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "suceess n",
        });
      }
    }

    // const chatIsexit = await Me.findOne({ buddyId: buddyId });

    // if (chatIsexit) {
    //   // Check if the useralready exists in the array
    //   chatIsexit.chat.push(message);
    //   await chatIsexit.save();
    //   return NextResponse.json({
    //     success: true,
    //     message: "suceess",
    //   });
    // } else {
    //   const data = {
    //     userId,
    //     buddyId,
    //     chat: [message],
    //   };
    //   const newChat = await Chat.create(data);
    //   if (newChat) {
    //     return NextResponse.json({
    //       success: true,
    //       message: "suceess",
    //     });
    //   }
    // }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "not suceess" + error,
    });
  }
  //   const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //   const { prompt } = await req.json();

  //   const result = await model.generateContent(prompt);
  //   console.log(result.response.text());
  //   return NextResponse.json({
  //     message: result.response.text(),
  //   });
}
