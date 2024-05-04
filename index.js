require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const registerRouter = require("./routes/res.router");
const loginRouter = require("./routes/login.router");
const {
  getAllBlogs,
  getBlogById,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("./routes/blog.router");
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", getAllBlogs, getBlogById, addBlog, deleteBlog, updateBlog);

mongoose
  .connect("mongodb://localhost:27017/latestdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection to Mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 2299;
app.listen(port, () => console.log(`listening on port${port}`));
