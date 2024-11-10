import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error.js"

export const verifyUserToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) {
        return next(errorHandler(401, 'USER UNAUTHORIZED'))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(400, 'JWT EXPIRED'))
        }
        req.user = user
        next()
    })
}