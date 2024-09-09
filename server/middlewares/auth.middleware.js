import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req, res, next) => {
  try {
    let token = req.headers["Authorization"];

    if (!token) {
      return res.status(401).json({
        status: "Failure",
        message: "Unauthorized: No token provided",
      });
    }

    let isValidToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!isValidToken) {
      return res
        .status(401)
        .json({ status: "Failure", message: "Unauthorized: Invaid token" });
    }

    let user = await User.findById(isValidToken.id);

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};
