import jwt from "jsonwebtoken";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import DatabaseConn from "@/database";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    await DatabaseConn();
    let { email, password } = await req.json();
    //check values
    if (email === "" || password === "") {
      return NextResponse.json({
        success: false,
        message: "All Values are Required !",
      });
    }

    //remove whitespace
    email = email.trim();
    password = password.trim();

    //check user email is exit
    const userExit = await User.findOne({ email: email });
    if (userExit) {
      //check password correct or not
      const isMatch = await bcrypt.compare(password, userExit.password);

      if (isMatch) {
        const token = userExit.token;
        return NextResponse.json({
          success: true,
          message: "Login Success !",
          token: token,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Password Wrong !",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Email Wrong !",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went Wrong , please try again !",
    });
  }
}
