import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/model/User";
import DatabaseConn from "@/database";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { email, password } = await req.json();
    if (email.trim() === "" && password.trim() === "") {
      return NextResponse.json({
        success: false,
        message: "All Fields are Required !",
      });
    }

    var salt = await bcrypt.genSalt(10);
    var hashPass = await bcrypt.hash(password, salt);

    const updatePassword = await User.updateOne(
      { email: email },
      { password: hashPass }
    );

    if (updatePassword) {
      return NextResponse.json({
        success: true,
        message: "Password Updated!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Password not  Updated!",
      });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Somting Went Wrong !",
    });
  }
}
