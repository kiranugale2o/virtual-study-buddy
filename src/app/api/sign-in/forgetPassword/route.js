import DatabaseConn from "@/database";
import User from "@/model/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    await DatabaseConn();
    let { email, appName = "StudyBuddy" } = await req.json();
    const userExits = await User.findOne({ email: email });
    //if user is not found
    if (!userExits) {
      return NextResponse.json({
        success: false,
        message: "this email is not found !",
      });
    }
    if (!userExits?.verifyUser) {
      return NextResponse.json({
        success: false,
        message: "User exit but not verified",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = Date.now() + 60000;
    const user = await User.findOne({ email: email });
    if (user) {
      await User.updateOne(
        { email: email },
        { otp: otp, expiration: expiration }
      );
    }
    await transporter.sendMail({
      to: email,
      subject: " Your OTP Code",
      html: `
           <div>
          <h1>${appName}</h1>
            <h1 class="color:"red"">Verification code For Reset Password !</h1>
             <br/>
            <p>Enter the following verification code when prompted:
            <h1>
            <bold>
            ${otp}
            </bold></h1> valid upto 2 minitues</p>
            <b>To Protect Do not Share this code !</b>
            <footer>thank you</footer>
          </div>`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP Send !",
    });
  } catch (error) {
    console.log(error.message);

    return NextResponse.json({
      success: false,
      message: "SOME ERROR",
    });
  }
}
