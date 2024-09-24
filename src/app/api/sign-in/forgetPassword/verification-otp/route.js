import jwt from "jsonwebtoken";
import DatabaseConn from "@/database";
import User from "@/model/User";
import { NextResponse } from "next/server";
export async function POST(req) {
  await DatabaseConn();
  try {
    let { email, otp } = await req.json();

    // Find the user
    const user = await User.findOne({ email: email });
    otp = otp.trim();
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "This Email is Not found try again!",
      });
    }

    // Check if OTP is correct and not expired

    if (user.otp === otp && Date.now() < user.expiration) {
      return NextResponse.json({
        success: true,
        message: "Email verified",
        user: user,
      });
    } else if (Date.now() >= user.expiration) {
      return NextResponse.json({
        success: false,
        status: 0,
        message: "otp exprise",
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 1,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      message: "Server problem",
    });
  }
}
