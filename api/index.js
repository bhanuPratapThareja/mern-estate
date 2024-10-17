import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express()

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to DB Estate')
        app.listen(5001, console.log('Server is running on port 5001'))
    })
    .catch((err) => console.log(err))