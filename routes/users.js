import express from "express";
import { getUsers, signin, signup } from "../controllers/user.js";


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/', getUsers);

export default router;