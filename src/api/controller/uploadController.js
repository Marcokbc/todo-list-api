const express = require("express");
const userService = require("../services/userService");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

module.exports = {
  async uploadImage(req, res) {
    try {
      const userId = req.params.userId;

      const user = await userService.findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.profileImage) {
        const publicId = user.profileImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      user.profileImage = req.file.path;
      await user.save();

      return res.status(200).json({
        message: "Upload successful",
        url: req.file.path,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Upload failed", error });
    }
  },
};
