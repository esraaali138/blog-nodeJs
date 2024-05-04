const { User, validateUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const loginRouter = router.post('/login', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) {
        return res.status(400).send(  {message : error.details[0].message});
    }
    
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({ message: "Wrong email or password" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Incorrect email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({ email }, "mySecret", { expiresIn: "1h" });
        res.header("jwt", token).send({ token, message: "Successful login" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = loginRouter;
