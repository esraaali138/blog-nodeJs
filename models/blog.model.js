const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    img : {
        type : String,
        required : true

    },
    title : {
        type : String,
        required : true

    },
     body : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User', 
        required : [true , 'user is required']
      },
})
const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog