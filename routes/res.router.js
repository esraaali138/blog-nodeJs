const { User, validateUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const registerRouter = router.post("/register", async (req, res) => {
  
    const { error } = validateUser(req.body); 
    if (error) {
        return res.status(400).send( {message : error.details[0].message});
    }

    try {
        let user = await User.findOne({ email: req.body.email }); 
        if (user) {
            return res.status(400).send({message : "User already exists. Please sign in"}); 
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: password,
        });

        await user.save(); 
        return res.status(201).json(user);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

module.exports = registerRouter; // Only export registerRouter, not router
