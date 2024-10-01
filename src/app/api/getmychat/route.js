import DatabaseConn from "@/database";

import { ConversationModel } from "@/model/ConverstationModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { userId, buddyId } = await req.json();
    const conversation = await ConversationModel.findOne({
      $or: [
        { sender: userId, receiver: buddyId },
        { sender: buddyId, receiver: userId },
      ],
    })
      .populate("messages")
      .sort({ updatedAt: -1 });
    console.log(conversation);

    return NextResponse.json({
      success: true,
      data: conversation.messages,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: { sender: "user", text: "hi" },
    });
  }
}
