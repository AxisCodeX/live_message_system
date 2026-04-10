import { socket } from "./socket";

function handleConnection({roomId , username}){
    
        socket.emit("joinRoom",{roomId,username})
   
   
}

function receiveMessage({mes,username}){
    console.log(mes, username);
    

}

function disconnect(reason){
    console.log(reason);
    
}

function leaveRoom({roomId , username}){
    socket.emit("leaveRoom",{roomId , username})

}

function navigate(navigate){
    navigate("/connect-room")
}





export {handleConnection,receiveMessage , disconnect,leaveRoom,navigate}