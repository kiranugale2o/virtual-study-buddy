import DatabaseConn from "@/database";
import { Favourite } from "@/model/Favourites";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DatabaseConn();
    const { data } = await req.json();

    const userExits = await Favourite.findOne({ userId: data.userId });

    if (userExits) {
      if (!userExits.notesId.includes(data.notesId)) {
        const updateFav = await Favourite.updateOne(
          { userId: data.userId },
          { $push: { notesId: data.notesId } }
        );
        if (updateFav) {
          return NextResponse.json({
            success: true,
            message: "Add As Favourite !",
          });
        }
      } else {
        return NextResponse.json({
          success: true,
          message: "Already Added !",
        });
      }
    } else {
      const addData = {
        userId: data.userId,
        notesId: [data.notesId],
      };
      const addFav = await Favourite.create(addData);
      if (addFav) {
        return NextResponse.json({
          success: true,
          message: "Add As Favourite !",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: error.message,
        });
      }
    }
    return NextResponse.json({
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
