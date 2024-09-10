import mongoose from "mongoose";
import User from "./user.model.js";

let postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [100, "Title must be at most 100 characters long"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [20, "Content must be at least 20 characters long"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //   validate: {
      //     validator: async (value) => {
      //       const user = await User.findById(value);
      //       return user && user.role === "admin";
      //     },
      //     message: "Only admins can create posts",
      //   },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
