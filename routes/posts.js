const express = require ('express');

const { getPosts, getPost, createPost, updatePost, likePost, deletePost } = require ('../controllers/posts.js');
const auth = require('../Middlewares/authMiddlewares.js');

const router = express.Router();

router.get('/', getPosts);
router.post('/',auth, createPost);
// router.get('/:id', getPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost',auth, likePost);

module.exports = router;