import express from "express";
import {
  getAllUsers,
  createNewUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createNewUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
