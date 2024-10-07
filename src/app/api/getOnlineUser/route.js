import { Student } from "@/model/StudentProfile";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await DatabaseConn();
    // Fetch online users
    const onlineUsers = await Student.find({ online: true }).toArray();
    return NextResponse.json({
      success: true,
      onlineUsers: onlineUsers,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Somthing Wrong !",
    });
  }
}
