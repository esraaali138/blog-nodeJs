const Blog = require("../models/blog.model");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../models/user.model");
const getAllBlogs = router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
});
/////
const getBlogById = router.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blogById = await Blog.findOne({ _id: id });
  if (!blogById) {
    res.status(404).send("this blog is not exist");
    return;
  }
  res.send(blogById);
});

const addBlog = router.post("/blog/add",  async (req, res) => {
  const { img, title, body } = req.body;

  const user = await User.findOne(req.params.id);
  console.log(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const newBlog = new Blog({
    img,
    title,
    body,
    user: user._id,
  });
  const savedBlog = await newBlog.save();
  await savedBlog.populate("user");
  res.status(201).json(savedBlog);
});

const deleteBlog = router.delete("/blog/:id", async (req, res) => {
  try {
    const user = await User.findOne(req.user);
    const blogId = req.params.id;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "this blog is not found" });
    }
    await Blog.deleteOne({ _id: blogId });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
const updateBlog = router.patch("/blog/update/:id", async (req, res) => {
  try {
    const user = await User.findOne(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "this blog is not found" });
    }
    await Blog.updateOne({ _id: blogId }, req.body);
    await blog.save();
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = { getAllBlogs, getBlogById, addBlog, deleteBlog, updateBlog };
