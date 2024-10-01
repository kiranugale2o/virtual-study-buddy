import { Notes } from "@/model/Notes";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const deleteNote = await Notes.deleteOne({ _id: id });
    if (deleteNote) {
      return NextResponse.json({
        success: "true",
        message: "Notes Deleted Successfully !",
      });
    } else {
      return NextResponse.json({
        success: "false",
        message: "Somthing Wrong ! try Again",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: "false",
      message: error.message,
    });
  }
}
