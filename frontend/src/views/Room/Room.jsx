import React, { useEffect, useRef, useState } from "react";
import { useParams , useSearchParams} from "react-router-dom";
import { MessagesSquare } from "lucide-react";
import { X } from "lucide-react";
import Input from "../../component/Input/Input";
import { socket } from "../../socket/socket";
import { useNavigate } from "react-router-dom";
import { handleConnection,disconnect,leaveRoom, navigate } from "../../socket/socketFuncs";

function Room() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams()
  const [username,setUsername] = useState(searchParams.get("username"))
  const navigate  = useNavigate()
  
  const [curRoom , setCurrRoom] = useState(roomId)
  const [messages, setMessages] = useState([])
  const [mes , setMes ] = useState("") 
  const[err,setErr] = useState("")
  const [roomInfo , setRoomInfo] = useState("")

  const mesRef = useRef()


  function sendMessages(){
    
    socket.emit("sendMessage",{mes , username,roomId},(response)=>{
      console.log("server responded : " , response);
      
    })

    setMessages(prev=> [...prev , {mes,username : "user"}])
  }

  function receiveMessage({mes,username}){
    console.log(mes , username);
    setMessages(prev=> [...prev , {mes , username}])
  }

  function receiveRoomInfo({admin , max , roomId , currentMembers}){
    console.log(admin , max , roomId , currentMembers);
    setRoomInfo({
      admin,
      max,
      roomId,
      currentMembers
    })

  }

  function handleErr(err){
    console.log(err);
    
    setErr(err)
  }

  function roomLeft(){
    navigate("/connect-room")
  }

  function RoomJoined(){
    console.log("roomJoined");
    socket.emit("getRoomInfo",{roomId})
  }

  function DiscardRoom(){
    socket.emit("discardRoom",{roomId})
  }


  useEffect(()=>{
    
      if(socket.connect){
      socket.emit("joinRoom",{roomId,username})
      socket.on("roomJoined",RoomJoined)
      socket.on("roomjoiningFailed",handleErr)
      socket.on("receiveMessage",receiveMessage)
      socket.on("roomLeft",roomLeft)
      socket.on("receiveRoomInfo",receiveRoomInfo)
      socket.on("roomDiscarded",roomLeft)
    }else{
      socket.once("connect",handleConnection)
    }
  
    return ()=>{
      socket.off("connect",handleConnection)
      socket.off("receiveMessage",receiveMessage)
      socket.off("roomLeft",roomLeft)
      socket.off("roomJoined",RoomJoined)
      socket.off("roomjoiningFailed",handleErr)
      socket.off("receiveRoomInfo",receiveRoomInfo)
      socket.off("roomDiscarded",roomLeft)
    }

  }
  ,[curRoom,username])

  



  return (
    <div className="flex flex-col  text-gray-300 min-h-screen  min-w-screen p-2.5  ">
      <div className="headingSection flex justify-between bg-[#16171d] sticky top-0 z-10 pt-2">
        <div className="leftSection">
          <div className="flex items-baseline">
            <MessagesSquare />
            <span className="px-1.5">Chat</span>
          </div>
        </div>
        <div className="middleSection">
          <h2>room : {roomId}</h2>
        </div>
        <div className="rightSection">
          <button onClick={()=>{
            if (username === roomInfo.admin){
              DiscardRoom({roomId})
            }else{
              leaveRoom({roomId , username})
            }
          }} className="bg-red-900 px-2 py-1.5 rounded-md font-semibold">
            {" "}
            {(username === roomInfo.admin)?"Discard Room":"Leave Room"}
          </button>
        </div>
      </div>

      <div className="message-section-room  flex flex-col flex-1 overflow-y-auto  py-2.5 min-h-0 ">
        <div className="flex grow">
          {(messages.length !==0 )? (
            <div className="w-full">
              <ul>
                {messages.map((message,idx)=>{
                  
                  return (
                    <li key={idx} className={`w-full  flex flex-col p-1.5 ${(message.username === "user")? "items-end":""}`}>
                      <div className="flex gap-1.5 items-center relative">
                        <span className={`bg-gray-700 p-2  text-center w-10 h-10 rounded-full  ${(message.username === "user")? "order-2":""}`}>{message.username[0].toUpperCase()}
                         
                        </span>
                         <span className={`absolute font-semibold text-sm px-2 text-center py-1.5 rounded-xl -bottom-1.5  ${(message.username ==="user")? "bg-blue-700 right-7": "bg-gray-600 left-7 "} `}>{message.mes}</span>

                        
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : ""}
        </div>

        
      </div>
      <div className="w-full  flex fixed bottom-0  justify-center items-center z-10 bg-[#16171d]">
         <form className="" onSubmit={(e)=>{
          e.preventDefault()
          sendMessages()
          setMes("")
         }} >
          <Input ref={mesRef} label={"mes"} className={' font-medium text-gray-300'} placeholder='Enter your message' value={mes} onChange={(e)=>setMes(e.target.value)} />
         </form>
        </div>
    </div>
  );
}

export default Room;
