const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  // 1. Personal Information
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

  // 2. Education Details
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
  // 3. Study Preferences
  subjectsOfInterest: {
    type: [String], // array of strings to store multiple subjects
    required: true,
  },
  preferredStudyMethods: {
    type: [String], // array of study methods like 'group', 'video call', etc.
    required: true,
  },
  studyTime: {
    type: [String],
    required: true,
  },
  // 4. Location Information
  location: {
    type: String,
    required: true,
  },

  // 5. Optional Information
  profilePicture: {
    type: String, // URL for the profile picture
  },

  // 6. Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
  },
});

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
