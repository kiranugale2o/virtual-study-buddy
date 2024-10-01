import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Student",
  },
  title: String,
  content: {
    type: String,
    default: ".............",
  },
  img: String,
  video: String,
  postingTime: String,
});

export const Notes =
  mongoose.models.Notes || mongoose.model("Notes", NotesSchema);
