import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  profilePic: {
  url: {
    type: String,
    default: "",
  },
  publicId: {
    type: String,
    default: "",
  },
},

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  address: {
    type: String,
    default: "",
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;