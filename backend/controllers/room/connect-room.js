import { ApiError } from "../../Helpers/ApiError.js";
import { io } from "../../server.js";
import { joinRoom } from "../../services/joinARoom.js";
import RoomModel from "../../Models/Room.js"

 async function connectRoom({roomId,username},socket){
    try {
        
            const room =await RoomModel.findOne({
                roomId
            })
            if(!room){
               
                socket.emit("roomjoiningFailed","Room joining failed please check your connection and try refreshing the page.")
            }else{
                 socket.join(roomId)
                 console.log("room joined",socket.id);
                 
                socket.emit("roomJoined")
            }
        
        
    } catch (error) {
        throw new ApiError(error.message)
    }
}

export default connectRoom