import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json({ message: "User created successfully!", data: user });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json({ message: "Wrong credentials!" });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    !isPasswordValid && res.status(400).json({ message: "Wrong credentials!" });

    const { password, updatedAt, __v, ...others } = user._doc;
    res.status(200).json({ message: "login success!", data: others });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as authRoute };
