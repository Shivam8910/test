import User from "../model/User.js";
import upload from "./multer.js";
import path from "path";

// Update user profile including the picture
export const updateUser = [
  upload.single("picture"), // Middleware to handle single file upload with the key 'picture'
  async (req, res) => {
    const { sub, nickname, gender } = req.body;
    const picture = req.file ? req.file.path.replace(/\\/g, "/") : null;

    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    try {
      const updateData = { nickname, gender };
      if (picture) {
        updateData.picture = picture;
      }

      console.log("Update data:", updateData);

      const updatedUser = await User.findOneAndUpdate({ sub }, updateData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("Updated user:", updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  },
];

export const addUser = async (req, res) => {
  try {
    let exist = await User.findOne({ sub: req.body.sub });
    if (exist) {
      res.status(200).json({ msg: "User already exists" });
      return;
    }

    const newUser = new User({
      ...req.body,
      gender: "choose",
      level: "Take Test",
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error); // Debugging: Log the error
    return res.status(500).json(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // Debugging: Log the error
    return res.status(500).json(error.message);
  }
};
