import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      required: false,
    },
    userContact: {
      type: String,
      required: function () {
        return this.isNew;
      },
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
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
  if (!this.isModified("userPassword") || !this.userPassword) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.userPassword = await bcrypt.hash(this.userPassword, salt);
    next();
  } catch (err) {
    next(err);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
