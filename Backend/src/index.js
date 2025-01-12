import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.lib.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
const app = express()
// we stored our server port in a dotenv file
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,// allow cookies and auth heads sent with requests
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT)
    //func connecting to mongoDB
    connectDB()
})