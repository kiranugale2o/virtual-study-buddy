import mongoose from "mongoose";

const FavouritesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Student",
  },
  notesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Notes",
    },
  ],
});

export const Favourite =
  mongoose.models.Favourite || mongoose.model("Favourite", FavouritesSchema);
