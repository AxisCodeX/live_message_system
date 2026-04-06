

async function leaveRoom({roomId , username},socket){
    socket.leave(roomId)
    socket.emit("roomLeft")

}

export default leaveRoom