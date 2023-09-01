const express = require('express');
const { getAllBlogs, createBlogController, updateBlogController, deleteBlogController, getBlogById } = require('../controllers/blogController');

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

module.exports = router;