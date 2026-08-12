const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const signUp = async (req, res) => {
    try {
        const userInDatabase = await User.findOne({
            username: req.body.username
        })

        if (userInDatabase) {
            return res.status(409).json({ err: 'Username already taken.' })
        }

        const emailInDatabase = await User.findOne({
            email: req.body.email
        })

        if (emailInDatabase) {
            return res.status(409).json({ err: 'Email already taken.' })
        }
        
        if (!req.body.password || req.body.password.length <= 6) {
            return res.status(400).json({ err: 'Password must be more than 6 characters. '})
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10)

        const userData = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        }

        const user = await User.create(userData)

        const payload = { username: user.username, _id: user._id }

        const token = jwt.sign({payload}, process.env.JWT_SECRET)

        res.status(201).json({ token })
    } catch(err) {
        res.status(400).json({ err: err.message })
    }
}

const signIn = async (req, res) => {
    try {
        let userInDatabase
        
        if (req.body.email) {
            userInDatabase = await User.findOne({email: req.body.email})
        } else {
            userInDatabase = await User.findOne({
                username: req.body.username
            })
        }
        
        if (!userInDatabase) {
            return res.status(404).json({ err: 'User does not exist.' })
        }

        const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)

        if (!validPassword) {
            return res.status(401).json({ err: 'Login failed. Please try again.' })
        }

        const payload = { username: userInDatabase.username, _id: userInDatabase._id }
        const token = jwt.sign({ payload }, process.env.JWT_SECRET)

        res.status(200).json({ token })

    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports = {
    signUp,
    signIn,
}