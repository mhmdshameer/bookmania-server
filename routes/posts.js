import express from "express";
import { createPost, getPost, getPosts } from "../controllers/posts.js";

const router = express.Router();

router.post("/", createPost);
router.get('/', getPosts);
router.get('/:id', getPost);

export default router;