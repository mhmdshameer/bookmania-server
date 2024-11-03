import Post from "../models/post.js";

export const createPost = async (req,res) => {
    const post = req.body;
    
    const newPost = new Post({
        ...post, createdAt: new Date().toISOString(),
    });
    console.log(newPost)

    try {
        await newPost.save();
        res.status(201).json(newPost);        
    } catch (error) {
        console.error("Error saving post:",error.message);
        res.status(409).json({message: error.message});
    }
}

export const getPosts = async (req,res) => {
    console.log("reached")
    try {
        const posts = await Post.find()
        console.log("Get posts");
        res.status(200).json(posts)        
    } catch (error) {
        console.log("getPosts:",error)
        res.status(400).json(error.message);
    }
}
export const getPost = async (req,res) => {
   const {id} = req.params
    try {
        const post = await Post.findById(id)
        console.log("Get post");
        res.status(200).json(post)        
    } catch (error) {
        console.log("getPosts:",error)
        res.status(400).json(error.message);
    }
}