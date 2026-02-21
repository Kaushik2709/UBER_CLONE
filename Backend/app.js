import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDB } from "./db/db.js";
import dns from 'dns'
import userRoutes from "./routes/user.routes.js"
dotenv.config()
dns.setServers(['8.8.8.8'])
connectToDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server running")
})
app.use("/api/users", userRoutes)
export default app