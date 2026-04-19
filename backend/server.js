import { config } from "dotenv"
config({quiet:true})
import cors from "cors"
import express from "express"
import { Server, Socket } from "socket.io"
import {createServer} from "http"
import session from "express-session"

//local imports
import roomRouter from "./routers/room/Router.js"
import connectDB from "./db/dbConnect.js"
import { handleSocket } from "./socketFuncs/handleSocket.js"
import AuthRouter from "./routers/auth/router.js"

const app = express()
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    
    cookie : {
        httpOnly  : true,
        secure : false,
        maxAge : 1000 * 60 * 60
    }

}))

const httpServer = createServer(app)
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/",AuthRouter)
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


