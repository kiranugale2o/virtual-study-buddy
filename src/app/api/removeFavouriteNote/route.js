import { Favourite } from "@/model/Favourites";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { data } = await req.json();
    const updateFav = await Favourite.findOneAndUpdate(
      { userId: data.id },
      { $pull: { notesId: data.notesId } }
    );
    if (updateFav) {
      return NextResponse.json({
        success: true,
        message: "Remove From Favourites !",
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
