import express from "express";
import { createPost, deletePost, getPost, getPosts, takeBook, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.post("/", createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/takeBook', takeBook);
router.patch('/returnBook/:userId/bookId', takeBook);

export default router;