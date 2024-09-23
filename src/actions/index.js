import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import cookie from "cookie";
import { headers } from "next/headers";
import { parse } from "cookie";
//fetch Current User is exit or not
export async function currentUser() {
  const headersList = headers();
  const cookieHeader = headersList.get("cookie") || "";
  // Parse cookies
  const cookies = parse(cookieHeader);

  // Deserialize the object
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
