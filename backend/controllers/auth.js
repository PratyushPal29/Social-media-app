const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const register = async (req, res) => {
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
        console.log("Password: ",password)
        // const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, 10)
        console.log("Hash: ",passwordHash)

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location: location,
            occupation: occupation
        })
        res.status(201).json(newUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })

        if (!user) return res.status(400).json({ msg: "No user found" });

        const passMatch = await bcrypt.compare(password, user.password)

        if (!passMatch) return res.status(400).json({ msg: "Password not matched" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        return res.status(200).json({ token, user })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {register, login};