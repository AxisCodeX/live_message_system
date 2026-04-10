import { ApiError } from "../../Helpers/ApiError.js"
import RoomModel from "../../Models/Room.js"


async function leaveRoom({roomId , username},socket,io){
    socket.leave(roomId)
    socket.emit("roomLeft")
    let room = io.sockets.adapter.rooms.get(roomId)
    let size = room.size

    if(size === 1){
        const deletedRoom = await RoomModel.deleteOne(
            {
                roomId
            }
        ) 

        if (!deletedRoom){
            socket.emit("failed deleting the room")
            throw new ApiError("room deletion failed")
        }
    }
    

}

export default leaveRoom