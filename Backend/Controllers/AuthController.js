import User from "../Config/Database/Models/Usermodel.js";
import Order from "../Config/Database/Models/Ordermodel.js";
import Product from "../Config/Database/Models/Productmodel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, mobile, email, password, shopName, shopType, address, gstin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, error: "User already exists with this email." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      shopName,
      shopType,
      address,
      gstin
    });

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, { expiresIn: "2d" });

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
      token,
      user: { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email }
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, error: "Internal server error during signup." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "2d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        shopName: user.shopName
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user; 

    const {
      firstName,
      lastName,
      email,
      mobile,
      shopName,
      shopType,
      address,
      gstin,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        mobile,
        shopName,
        shopType,
        address,
        gstin,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Success response
    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Server error while updating profile:", err);

    // Send only server-related messages to frontend
    res.status(500).json({
      error: "Server error while updating profile. Please try again later.",
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required to delete account." });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    // Delete related data
    await Order.deleteMany({ user: userId });
    await Product.deleteMany({ user: userId });

    // Finally, delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "Account and all associated data deleted successfully.",
    });
  } catch (err) {
    console.error("Account deletion failed:", err);
    res.status(500).json({ error: "Server error while deleting account. Try again later." });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.user; // from auth middleware
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect." });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({ error: "New password cannot be the same as the old password." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error("Change Password Error:", err);
    res.status(500).json({ error: "Server error while changing password." });
  }
};
