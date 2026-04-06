import connectRoom from "../controllers/room/connect-room.js"
import { createRoom } from "../controllers/room/create-room.js"
import DiscardRoom from "../controllers/room/discardRoom.js";
import getRoomInfo from "../controllers/room/getRoomInfo.js";
import leaveRoom from "../controllers/room/leaveRoom.js";
import sendMessage from "../controllers/room/receiveMessage.js";


async function handleSocket(socket,io){
    socket.on("create-room",({roomId,admin,max})=>{
        console.log(roomId , admin , max);
        
        createRoom({roomId,admin,max},socket)
    })
    socket.on("joinRoom",({roomId , username})=>{
        connectRoom({roomId,username},socket)
    })

    socket.on("sendMessage",({mes,username,roomId})=>{
        sendMessage({mes,username,roomId},socket)
    })
    socket.on("getRoomInfo",({roomId})=>{
        getRoomInfo({roomId},socket)
    })
    socket.on("leaveRoom",({roomId , username})=>{
        leaveRoom({roomId , username},socket)
    })

    socket.on("discardRoom",({roomId})=>{
        DiscardRoom({roomId},socket,io)
    })
}

export {handleSocket}