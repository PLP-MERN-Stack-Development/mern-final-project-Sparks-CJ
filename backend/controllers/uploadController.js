// backend/controllers/uploadController.js
import path from "path";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const filePath = `/uploads/${req.file.filename}`;

    res.json({
      message: "Upload successful",
      filePath
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
