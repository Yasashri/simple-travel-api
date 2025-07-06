import { User } from "../models/index.js";
import bcrypt from "bcrypt";

// Create new user
const createUser = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Optional: Check for existing user
    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const user = await User.create(req.body);
    const { userPassword, ...userWithoutPassword } = user.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ userEmail });

    if (!user || !user.userPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { userPassword: pw, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile and optionally password
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { userFirstName, userLastName, userPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update names if provided
    if (userFirstName) user.userFirstName = userFirstName;
    if (userLastName) user.userLastName = userLastName;

    // Update password only if provided and valid
    if (userPassword !== undefined) {
      const trimmedPass = userPassword ? userPassword.trim() : "";
      if (trimmedPass.length > 0 && trimmedPass.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      if (trimmedPass.length >= 6) {
        user.userPassword = trimmedPass; // hashed in pre('save')
      }
      // if empty or spaces, ignore password update
    }

    const updatedUser = await user.save();

    const { userPassword: pw, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const userList = await User.find({}).select("-userPassword"); // Don't send passwords
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
