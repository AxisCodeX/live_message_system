import RoomModel from "../../Models/Room.js";



async function getRoomInfo({roomId},socket){
    const room =await RoomModel.findOne({
        roomId
    })

    if(!room){
        socket.emit("roomNotFound","The room doesn't exists.")
    }else{
        console.log(
            {
            admin : room.admin,
            max : room.max,
            roomId : room.roomId,
            currentMembers : room.currentPary
            }
        );
        
        socket.emit("receiveRoomInfo",{
            admin : room.admin,
            max : room.max,
            roomId : room.roomId,
            currentMembers : room.currentPary
        })

        
    }
}

export default getRoomInfo