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