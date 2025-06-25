import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userFirstName: {
      type: String,
      required: [true, "Please enter first name"],
    },
    userLastName: {
      type: String,
      required: [true, "Please enter last name"],
    },
    userEmail: {
      type: String,
      required: [true, "Please enter your email"],
    },
    userPassword: {
      type: String,
      required: [true, "Please enter a password"],
    },
    userContact: {
      type: Number,
      required: false,
    },
    userIsAdmin: {
      type: Boolean,
      required: [true, "Please enter first name"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
