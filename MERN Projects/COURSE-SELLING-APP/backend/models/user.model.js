import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    union: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema); // Schema is converted into model