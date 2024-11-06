import express from "express";
import { deleteUser, getUser, getUsers, searchedUsers, signin, signup, updateUser } from "../controllers/user.js";


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/searchUsers',searchedUsers );
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);
export default router;