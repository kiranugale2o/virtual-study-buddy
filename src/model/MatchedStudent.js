import mongoose from "mongoose";

const matchedStudentSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  matchedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference the MatchedStudent model
    },
  ],
});

// Register the model properly without resetting `mongoose.models`
const MatchedStudent =
  mongoose.models.MatchedStudent ||
  mongoose.model("MatchedStudent", matchedStudentSchema);

export default MatchedStudent;
