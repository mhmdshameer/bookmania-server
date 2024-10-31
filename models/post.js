import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    author: String,
    pages: String,
    price: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model('Post', postSchema);
export default Post;