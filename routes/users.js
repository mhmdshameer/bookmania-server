import express from "express";
import { deleteUser, getUsers, signin, signup } from "../controllers/user.js";


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/', getUsers);
router.delete('/:id',deleteUser);
export default router;