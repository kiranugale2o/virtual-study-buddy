import DatabaseConn from "@/database";
import { Student } from "@/model/StudentProfile";
import { formatDateforLastSeen } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { userId, status } = await req.json();

    // Update user status
    const updateStatus = await Student.updateOne(
      { _id: userId },
      {
        $set: {
          online: status === "online" ? true : false,
          lastSeen: await formatDateforLastSeen(),
        },
      },
      { upsert: true } // Create a new document if it doesn't exist
    );

    if (updateStatus) {
      return NextResponse.json({
        success: true,
      });
    } else {
      return NextResponse.json({
        success: true,
      });
    }
    return res.status(200).json({ message: "Status updated" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
