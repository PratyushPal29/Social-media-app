const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location: Math.floor(Math.random()*1000),
            occupation: Math.floor(Math.random()*1000)
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = register