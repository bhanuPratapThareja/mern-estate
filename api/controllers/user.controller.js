import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { errorHandler } from "../utils/error.js"

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        const error = errorHandler(401, 'Login Id mismatch!')
        return res.status(403).send(new Error('User not authorized! Login ID mismatch!'))
    }

    const update = {};
    for (const key of Object.keys(req.body)){
        if (req.body[key] !== '') {
            update[key] = req.body[key];
        }
    }

    if(update.password) {
       update.password = bcryptjs.hashSync(update.password, 10)
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: update
        }, { new: true })
        const { password: pass, ...userInfo } = updateUser.toObject({ getters: true })
        res.status(200).json({ user: userInfo })
    } catch (error) {
        console.log('update err: ', error)
        next(error)
    }
}