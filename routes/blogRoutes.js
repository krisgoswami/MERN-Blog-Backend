const express = require('express');
const { getAllBlogs, createBlogController, updateBlogController, deleteBlogController, getBlogById, getUserBlog } = require('../controllers/blogController');

const router = express.Router();

//GET - get all blogs
router.get('/allBlogs', getAllBlogs);

//GET - get blog by id
router.get('/getBlog/:id', getBlogById);

//POST - create blog
router.post('/createBlog', createBlogController);

//PUT - update blog
router.put('/updateBlog/:id', updateBlogController);

//DELETE - delete blog
router.delete('/deleteBlog/:id', deleteBlogController);

//GET - get user blog by id
router.get('/userBlogs/:id', getUserBlog);

module.exports = router;