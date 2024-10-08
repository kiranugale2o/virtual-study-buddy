// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { prompt } = await req.json();

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return NextResponse.json({
    message: result.response.text(),
  });
}
