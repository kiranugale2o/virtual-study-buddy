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
import { Notes } from "@/model/Notes";
import { Favourite } from "@/model/Favourites";

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
//fetch Single Buddy
export async function fetchOneBuddy(id) {
  await DatabaseConn();
  const data = await Student.findById(id);
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

//get All Notes
export async function GetAllNotes(id) {
  const notes = await Notes.find({ senderId: { $ne: id } }).populate(
    "senderId"
  );

  if (notes) {
    return JSON.parse(JSON.stringify(notes));
  } else {
    return null;
  }
}

//get Single Notes
export async function GetSingleNote(id) {
  const notes = await Notes.findById(id).populate("senderId");

  if (notes) {
    return JSON.parse(JSON.stringify(notes));
  } else {
    return null;
  }
}

//get MyPosted Notes
export async function GetMyPostedNotes(id) {
  const notes = await Notes.find({ senderId: id }).populate("senderId");

  if (notes) {
    return JSON.parse(JSON.stringify(notes));
  } else {
    return null;
  }
}

//get MyFavourites Notes
export async function GetFavouritesNotes(id) {
  const notes = await Favourite.findOne({ userId: id }).populate({
    path: "notesId",
    populate: {
      path: "senderId", // Populate senderId within each note
      model: "Student", // The model to populate from
    },
  });

  if (notes) {
    return JSON.parse(JSON.stringify(notes.notesId));
  } else {
    return null;
  }
}
