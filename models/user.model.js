
const mongoose = require('mongoose');
const joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : [true,'password required'],
    },
  

})

function validateUser(user){
    const schema = joi.object({
        firstName : joi.string(),
        lastName : joi.string(),
        email : joi.string().required().email(),
        password : joi.string().required().min(5)
    }) 
    return schema.validate(user);
}
const User = mongoose.model('User',userSchema);
// module.exports.validate = validateUser;
module.exports = {User,validateUser};