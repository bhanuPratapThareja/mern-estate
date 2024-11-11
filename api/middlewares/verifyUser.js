import { errorHandler } from "../utils/error.js"
import { verifyAccessToken } from '../utils/tokens.js'

export const verifyUserToken = async (req, res, next) => {
    const accessToken = req.cookies.access_token
    try {
        const user = await verifyAccessToken(accessToken)
        req.user = user
        next()
    } catch (error) {
        console.log('very access token error: ', error)
        return next(errorHandler(400, error))
    }
}