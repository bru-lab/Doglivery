import fs from "fs";
import { generateToken } from '../lib/token.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {

    const { fullName, email, password } = req.body;

    try {
        // check if the fields are empty
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });

        }

        if (password.length < 6) {
            return res.status(400).json({ message: "The password must be at least 6 characters" });
        }

        //Check if the user already exists
        const ExistingUser = await User.findOne({ email });
        if (ExistingUser) {
            return res.status(409).json({ message: "This email is already being used. Please, sign in." });
        }


        // Hashing the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sanitizedEmail = email.toLowerCase();

        // Create a new user
        const newUser = await User.create({
            fullName,
            email: sanitizedEmail,
            password: hashedPassword

        })

        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                role: newUser.role,
            });

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in signup controller", error);
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        // check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
        })


    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });

        res.status(200).json({ message: "Logged out successfully!" });

    } catch (error) {
        console.log("Error in logout controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({
        message: "Profile pic is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      // Delete temporary file even if user doesn't exist
      fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "User not found",
      });
    }

    // Upload temporary file to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "hot-dog-delivery/profiles",
      }
    );

    // Delete the temporary local file
    fs.unlinkSync(req.file.path);

    // Delete previous Cloudinary image
    if (user.profilePic?.publicId) {
      await cloudinary.uploader.destroy(
        user.profilePic.publicId
      );
    }

    // Save new Cloudinary image
    user.profilePic = {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };

    await user.save();

    return res.status(200).json({
      message: "Profile picture updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Error in update profile:", error);

    // If something fails after Multer created the file,
    // try to delete the temporary file.
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAuth = (req, res) => {

    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller: ", error);
        res.status(500).json({message: "Internal Server Error"})
    }


};