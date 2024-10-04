// pages/api/sendMessage.js
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
  const { message } = await req.json();
  pusher.trigger("chat", "message", { message });
  return NextResponse.json({ message: "Message sent" });
}
