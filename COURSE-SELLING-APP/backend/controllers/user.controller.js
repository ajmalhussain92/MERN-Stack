import {User} from "../models/user.model.js";

// Signup
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }
    const newUser = new User({firstName, lastName, email, password});
    await newUser.save();
    res.status(201).json({message: "Sign up successful!", newUser});
  } catch (error) {
    res.status(500).json({ errors: "Error creating user" });
    console.log("Error in signup", error);
  }
};