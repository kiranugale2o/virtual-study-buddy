import DatabaseConn from "@/database";
import { Notes } from "@/model/Notes";
import e from "express";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { data } = await req.json();
    console.log(data);

    const postNote = await Notes.create(data);
    if (postNote) {
      return NextResponse.json({
        success: true,
        message: "Successfully Posted !",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Server Not Working s Try Again !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Server Not Workinsssg Try Again !",
    });
  }
}
