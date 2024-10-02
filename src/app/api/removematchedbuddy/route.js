import MatchedStudent from "@/model/MatchedStudent";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { data } = await req.json();
    const updateFav = await MatchedStudent.findOneAndUpdate(
      { userId: data.userId },
      { $pull: { matchedStudents: data.buddyId } }
    );
    if (updateFav) {
      return NextResponse.json({
        success: true,
        message: "Remove Matched Buddy !",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something Went Wrong !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
