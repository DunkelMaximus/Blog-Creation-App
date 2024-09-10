import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  getAllPosts,
  getPostById,
  getPostsByUserId,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/user/:id", protectRoute, getPostsByUserId);
router.post("/", protectRoute, createPost);
router.patch("/:id", protectRoute, updatePost);
router.patch("/:id/like", protectRoute, likePost);
router.delete("/:id", protectRoute, deletePost);

export default router;
