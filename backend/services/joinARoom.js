import { io } from "../server.js";
import { ApiError } from "../Helpers/ApiError.js";

async function joinRoom(roomId){
     try {
        io.on("connection", (socket)=>{
            socket.on("joinRoom",()=>{
                socket.join(roomId)
            })
        })
        
     } catch (error) {
        throw new ApiError(error.message)
        
     }
}

export {joinRoom}