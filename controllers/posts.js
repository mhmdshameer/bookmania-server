import Post from "../models/post.js";

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post({
    ...post,
    createdAt: new Date().toISOString(),
  });
  console.log(newPost);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error saving post:", error.message);
    res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    console.log("reached update")
    const { id} = req.params;
    const post = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...post, id },
      { new: true }
    );
    console.log(updatedPost)
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req,res) => {
    try {
      const {id} = req.params;
      console.log(id)
      await Post.findByIdAndDelete(id);
    } catch (error) {
      console.log("error",error.message)
    }
  }
