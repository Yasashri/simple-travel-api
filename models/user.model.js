import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) return next();
  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next();
});
const User = mongoose.model("User", userSchema);

export default User;
