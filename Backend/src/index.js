import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.lib.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import {app, server} from"./lib/socket.js"

import path from "path"

dotenv.config()

// we stored our server port in a dotenv file
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,// allow cookies and auth heads sent with requests
}))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
// serving frontend app
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))


    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}

server.listen(PORT, ()=>{
    console.log("Server is running on ", PORT)
    //func connecting to mongoDB
    connectDB()
})