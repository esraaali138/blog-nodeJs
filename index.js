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



const DBURL = process.env.DB_URL;
mongoose.connect(DBURL).then(()=>{
  console.log("Successful connection to Mongodb");
}).catch((error)=> console.log(error))
app.listen(2299, () => {
  console.log(`Listening on port ${2299}`);
});
