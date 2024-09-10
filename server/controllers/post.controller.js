import Post from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ status: "Success", data: posts });
  } catch (error) {
    console.log("Error in getAllPosts controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Post.findById(id);
    res.status(200).json({ status: "Success", data: posts });
  } catch (error) {
    console.log("Error in getPostById controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const getPostsByUserId = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.status(200).json({ status: "Success", data: posts });
  } catch (error) {
    console.log("Error in getPostsByUserId controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({ title, content, author: req.user._id });
    res.status(201).json({ status: "Success", data: post });
  } catch (error) {
    console.log("Error in createPost controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await Post.findByIdAndUpdate(id, {
      title,
      content,
    });

    const post = await Post.findById(id);

    res.status(200).json({ status: "Success", data: post });
  } catch (error) {
    console.log("Error in updatePost controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!req.user) {
      return res
        .status(401)
        .json({ status: "Failure", message: "Unauthorized" });
    }

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.user._id
      );
    } else {
      post.likes.push(req.user._id);
    }

    res.status(200).json({ status: "Success", data: post });
  } catch (error) {
    console.log("Error in likePost controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ status: "Success", data: post });
  } catch (error) {
    console.log("Error in deletePost controller: ", error.message);
    res.status(500).json({ status: "Failure", message: error.message });
  }
};
