import { ApiError } from "../../Helpers/ApiError.js";
import RoomModel from "../../Models/Room.js"




async function createRoom({roomId , admin , max},socket){
    try {
       
            const room = await RoomModel.create({
                admin,
                roomId,
                max
            })

            if (room){
                socket.emit("roomCreated")
            }else{
                socket.emit("failedCreatingRoom","failed to create room, check your connection and try refreshing the page")
            }

        
    } catch (error) {
        console.log(error);
        
        throw new ApiError(error.message)
        
    }
}

export {createRoom}