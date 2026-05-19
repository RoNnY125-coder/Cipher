import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req , res , next) => {
    try {
        //check if auth header exists
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message: 'No token, authorization denied'})
        }

        //extract token after bearer
        const token = authHeader.split(' ')[1]

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET )

        //find the user from the decoded userId
        req.user = await User.findById(decoded.userId).select('-password')

        //call next() to move to the next middleware
        next()
    } catch (error) {
        res.status(401).json({message: 'Not Authorized , token failed'})
    }
}

export default protect