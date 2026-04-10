import { config } from "dotenv"
config({quiet:true})
import cors from "cors"
import express from "express"
import { Server, Socket } from "socket.io"
import {createServer} from "http"
import roomRouter from "./routers/room/Router.js"
import connectDB from "./db/dbConnect.js"
import { handleSocket } from "./socketFuncs/handleSocket.js"

const app = express()

const httpServer = createServer(app)
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const port = 3000;

(async ()=>{
    await connectDB()
})()


export const io = new Server(httpServer,{
    cors:{
        origin:["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})


io.on("connection",(socket)=>{
    handleSocket(socket,io)
})






httpServer.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
    
})


