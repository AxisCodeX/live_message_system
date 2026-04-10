import { ApiError } from "../../Helpers/ApiError.js";
import { io } from "../../server.js";
import { joinRoom } from "../../services/joinARoom.js";
import RoomModel from "../../Models/Room.js"

 async function connectRoom({roomId,username},socket,io){
    try {
        
            const room =await RoomModel.findOne({
                roomId
            })
            if(!room){
                socket.emit("error","Room joining failed please check your connection and try refreshing the page.")
            }else{
                const roomSize = io.sockets.adapter.rooms.get(roomId)
                if(roomSize?.size >= room.max){
                    socket.emit("error","Cannot join room max party has been reached. ")
                }else{
                 socket.join(roomId)
                 console.log("room joined",socket.id);
                 const roomSize = io.sockets.adapter.rooms.get(roomId)
                  if(roomSize?.size >= room.max){
                    socket.emit("maxPartyReached","Room Full.")
                  }
                socket.emit("roomJoined")
                }
                 
            }
        
        
    } catch (error) {
        throw new ApiError(error.message)
    }
}

export default connectRoom