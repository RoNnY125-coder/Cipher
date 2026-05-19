import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN}
    )
}

export const signup = async (req , res) => {
    try {
        const { username, email, password} = req.body

        const userExists = await User.findOne({email})
        if (userExists){
            return res.status(400).json({message: 'User already exists'})
        }

        const user = await User.create ({username,email,password})
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            plan: user.plan,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({message: 'User Does not exists'})
        }
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(401).json({message: 'Invalid credentials'})
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            plan: user.plan,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}