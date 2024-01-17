const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// *-----------
// Home Logic
// *-----------
const home = async (req, res) => {
  try {
    res.status(200).send("home || Router & Controller");
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// *--------------
// Register Logic
// *--------------
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }
    const userCreated = await User.create({ username, email, phone, password });
    res.status(201).json({
      msg: "Registration Successfull...",
      token: await userCreated.generateToken(),
      user_ID: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

// *--------------
// Login Logic
// *--------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ error: "Invalid Credentials" });
    }
    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        message: "Login Successfull...",
        token: await userExist.generateToken(),
        user_ID: userExist._id.toString(),
      });
    } else {
      res.status(400).json({ error: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = { home, register, login };
