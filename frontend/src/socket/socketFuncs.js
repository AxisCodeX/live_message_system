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



//TODO: what you did today linked backend , frontend socket together , handled logic for joiningr room , sending messages , receiving messages , leaving rooom 

//TODO : what to do now seperate logic for discard room and leave room , make logic for creating room  use db for room instances handle maximum room entry make only room that exist in db joinable , finish ui for displaying messages and finish room  page

export {handleConnection,receiveMessage , disconnect,leaveRoom,navigate}