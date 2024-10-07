import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  college: {
    type: String,
    required: true,
    trim: true,
  },
  CurrentEducation: {
    type: String,
    required: true,
    trim: true,
  },
  subjectsOfInterest: {
    type: [String],
    required: true,
  },
  preferredStudyMethods: {
    type: [String],
    required: true,
  },
  studyTime: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://yzlxgraclfixtcrahgup.supabase.co/storage/v1/object/public/studybuddy/public/programmer.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  },
  online: Boolean,
  lastSeen: {
    type: Date,
    default: Date.now,
  },
});

// Ensure proper model registration without resetting `mongoose.models`
export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
