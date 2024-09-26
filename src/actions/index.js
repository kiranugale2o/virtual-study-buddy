"use server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import cookie from "cookie";
import { headers } from "next/headers";
import { parse } from "cookie";
import DatabaseConn from "@/database";
import { Student } from "@/model/StudentProfile";
import { cookies } from "next/headers";
import MatchedStudent from "@/model/MatchedStudent";
//fetch Current User is exit or not
export async function currentUser() {
  const headersList = headers();
  const cookieHeader = headersList.get("cookie") || "";
  // Parse cookies
  const cookies = parse(cookieHeader);

  // // Deserialize the object
  const myObject = cookies["study-buddy_token"];

  if (myObject) {
    return jwt.verify(
      myObject,
      process.env.TOKEN_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          // Token is invalid or expired
          console.log(err);
          return null;
        }
        // Token is valid
        return decoded;
      }
    );
  }
}

//fetch exiting user data and return
export async function fetchUser(id) {
  await DatabaseConn();
  const data = await Student.findOne({ userId: id });
  if (data) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return null;
  }
}

//fetch all buddy
export async function fetchAllBuddys() {
  await DatabaseConn();
  const data = await Student.find();
  if (data) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return null;
  }
}

//get matched buddys
export const getMatchedStudents = async (id) => {
  // Find the student and populate the matchedStudents field with actual documents
  const studentWithMatches = await MatchedStudent.findOne({
    userId: id,
  }).populate("matchedStudents");

  if (studentWithMatches) {
    return JSON.parse(JSON.stringify(studentWithMatches.matchedStudents));
  } else {
    return null;
  }
};
