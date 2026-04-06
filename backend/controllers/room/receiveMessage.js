import RoomModel from "../../Models/Room.js";


async function sendMessage({mes,username,roomId},socket){
    const room = await RoomModel.findOne(
        {
            roomId
        }
    )

    if (!room){
        socket.emit("roomNotFound","The room doesn't exists.")
    }else{
        socket.to(roomId).emit("receiveMessage",{mes,username})
    }
}

export default sendMessage