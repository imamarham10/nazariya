import express from "express";
import { getPostsBySearch, getPosts,createPosts, updatePost, commentPost, deletePost, likePost, getPost } from "../controllers/post.js";
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/',getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPosts);
router.post('/:id/commentPost', commentPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;