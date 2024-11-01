import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    pages: String,
    price: String,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model('Post', postSchema);
export default Post;