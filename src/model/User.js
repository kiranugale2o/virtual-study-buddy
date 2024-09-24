import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `Invalid Email !`,
    },
  },
  password: String,
  otp: String,
  expiration: String,
  verifyUser: {
    type: Boolean,
    default: false,
  },
  token: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
