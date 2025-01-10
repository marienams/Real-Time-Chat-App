import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.lib.js"

dotenv.config()
const app = express()
// we stored our server port in a dotenv file
const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT)
    connectDB()
})