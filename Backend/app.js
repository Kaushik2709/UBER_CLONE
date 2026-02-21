import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Server running")
})

export default app