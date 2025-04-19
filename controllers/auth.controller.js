const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env.local" });

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

    console.log("New user registered:", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const loggedUser = await User.findOne({ username });
    const storedPassword = loggedUser.password;

    const comparePassword = await bcrypt.compare(password, storedPassword);

    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Login credentials not valid!",
      });
    }

    const token = jwt.sign({ id: loggedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: loggedUser.id,
        username: loggedUser.username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
