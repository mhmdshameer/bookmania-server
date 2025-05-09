import express from "express";
import { createPost, deletePost, getPost, getPosts, returnBook, searchPosts, takeBook, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.patch('/takeBook', takeBook);
router.patch('/returnBook', returnBook);

router.post("/", createPost);
router.get('/searchPosts', searchPosts);
router.get('/', getPosts);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;