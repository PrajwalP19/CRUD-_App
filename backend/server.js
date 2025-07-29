import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import {userRoutes} from "./routes/user.route.js"
import { connectDB } from "./config/db.js"


dotenv.config()


const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on PORT:${PORT}`)
})

