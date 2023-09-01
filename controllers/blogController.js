const blogModel = require('../models/blogModel');

exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image } = req.body;
        //validation
        if (!title || !description || !image) {
            return res.status(400).send({
                message: 'fill all fields'
            })
        }
        const newBlog = new blogModel({ title, description, image });
        await newBlog.save();
        return res.status(201).send({
            message: 'blog created',
            newBlog
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'error creating blog' });
    }
}

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        if (!blogs) {
            return res.status(200).send({ message: 'no blogs found' })
        }
        return res.status(200).send({
            blogscount: blogs.length,
            blogs
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'error fetching blogs'
        })
    }
}

exports.getBlogById = () => {
    try {

    } catch (error) {

    }
}

exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({ message: 'sucessfully updated', updatedBlog });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "error updating blog post" });
    }
}

exports.deleteBlogController = () => {
    try {

    } catch (error) {

    }
}