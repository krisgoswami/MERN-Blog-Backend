const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const mongoose = require('mongoose');

//creates blog posts
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation to confirm all fields are filled
        if (!title || !description || !image) {
            return res.status(400).send({
                message: 'fill all fields'
            })
        }
        //to check user exists to create a blog post
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session }); // saving the blog post based on session
        existingUser.blogs.push(newBlog); // adding the user, who created the blog, into the blog post
        await existingUser.save({ session }); // saving the user based on session
        await session.commitTransaction(); // saving the session
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

//get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        if (!blogs) {
            return res.status(200).send({
                message: 'no blogs found',
                success: false
            })
        }
        return res.status(200).send({
            success: true,
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

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({ message: 'post not found' });
        }
        return res.status(200).send(blog);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'error fetching blog post' });
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

exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findOneAndDelete(req.params.id).populate('user'); // get user object to delete the post id from it
        await blog.user.blogs.pull(blog); // pull the specified blog post and delete it
        await blog.user.save(); // save the user with the updated blog list
        return res.status(200).send({ message: 'post deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'error deleting blog post' });
    }
}

//get all the blogs created by a specific user id
exports.getUserBlog = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs'); // populating blogs from the user object
        if (!userBlog) {
            return res.status(404).send({ message: 'blog not found' });
        }
        return res.status(200).send({
            success: true,
            userBlog
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: 'blog not found' });
    }
}