import RoomModel from "../../Models/Room.js"

async function handleDisconnection(socket,io){
    const rooms = [...socket.rooms].filter((room)=> room != socket.id)

    for (let room of rooms){
        const roomSize = io.sockets.adapter.rooms.get(room)
        if (roomSize?.size == 1){
            await RoomModel.deleteOne(
                {
                    roomId : room
                }
            )

        }

    }

}

export default handleDisconnection