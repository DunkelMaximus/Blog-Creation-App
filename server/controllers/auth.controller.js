import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const createNewUser = async (req, res) => {
  let { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return res
        .status(409)
        .json({ status: "Failure", message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({ status: "Success", data: newUser, token });
  } catch (error) {
    console.log("Error in createNewUser controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "Failure", message: "Incorrect email or password" });
    }

    let isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "Failure", message: "Incorrect email or password" });
    }

    let token = generateToken(user._id);

    res.status(200).json({
      status: "Success",
      message: "Logged in successfully",
      data: user,
      token,
    });
  } catch (error) {
    console.log("Error in loginUser controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: "Success", message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logoutUser controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};
