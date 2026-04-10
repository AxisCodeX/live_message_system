import { ApiError } from "../../Helpers/ApiError.js"
import RoomModel from "../../Models/Room.js"


async function DiscardRoom({roomId},socket,io){
    const sockets = io.sockets.adapter.rooms.get(roomId)
    io.to(roomId).emit("roomDiscarded","Room has been discarded by the admin . ")
    if(sockets.size !==0){
        for (let s  of sockets){
        const targetSocket = io.sockets.sockets.get(s)
        targetSocket.leave(roomId)
    }
    }

    const deletedRoom = await RoomModel.deleteOne(
        {
            roomId
        }
    )

    if (!deletedRoom){
        socket.emit("error","failed deleting the room")
        throw new ApiError("failed deleting roomId")
    }
    //TODO: today you mustly completed the frontend , you connected your app with backend , now what remains is make the deletioin logic for a room from db when it is discarded , make the maxparty logic , after each leave check if the room sze is zero if yes remove from db(also after each disconnection) , style the room/roomId/user page and work on global chatting system  


}

export default DiscardRoom