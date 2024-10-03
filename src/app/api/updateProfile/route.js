import { Student } from "@/model/StudentProfile";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { data, id } = await req.json();
    const updateProfile = await Student.findByIdAndUpdate(id, data);
    if (updateProfile) {
      return NextResponse.json({
        success: true,
        message: "Profile Update Successfully !",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Somthing Else Try Again !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
