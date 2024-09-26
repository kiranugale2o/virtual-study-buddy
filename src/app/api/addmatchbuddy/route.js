import DatabaseConn from "@/database";
import MatchedStudent from "@/model/MatchedStudent";
import { Student } from "@/model/StudentProfile";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { userId, matchUser } = await req.json();

    const addMatchedStudent = await MatchedStudent.findOne({ userId: userId });

    if (addMatchedStudent) {
      // Check if the useralready exists in the array
      if (!addMatchedStudent.matchedStudents.includes(matchUser)) {
        // If it doesn't exist, push the new user
        addMatchedStudent.matchedStudents.push(matchUser);
        await addMatchedStudent.save(); // Save the updated document
        return NextResponse.json({
          success: "true",
          message: "Matched !",
        });
        console.log("Subject added successfully!");
      } else {
        return NextResponse.json({
          success: "false",
          message: "This Buddy is Already Matched !",
        });
        console.log("Subject already exists in the array.");
      }
    } else {
      const data = {
        userId,
        matchedStudents: matchUser,
      };
      const addMatch = await MatchedStudent.create(data);
      //await addMatch.save();
      if (addMatch) {
        return NextResponse.json({
          success: "true",
          message: "Matched !",
        });
      } else {
        return NextResponse.json({
          success: "false",
          message: "Not Matched !",
        });
        console.log("error");
      }
    }

    return NextResponse.json({
      success: "false",
      message: "Not Matched !",
    });

    console.log("Subject added successfully!");
  } catch (error) {
    console.log("Error updating subjects:", error);
    return NextResponse.json({
      success: "false",
      message: "Not Matched fff!" + error.message,
    });
  }
}
