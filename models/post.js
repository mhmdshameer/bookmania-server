import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    author: String,
    desc: String,
    genre: String,
    pages: String,
    price: String,
    available:{type: Boolean,default: true},
    demand:{ type: Number, default: 0 } ,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model('Post', postSchema);
export default Post;