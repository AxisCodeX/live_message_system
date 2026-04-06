import React,{ useState,useEffect } from "react";
import DialogBox from "../../component/Dialog/DialogBox";
import Input from "../../component/Input/Input";
import configs from "../../configs/config"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {socket} from "../../socket/socket"
import { X } from "lucide-react";
function ConnectRoom() {
  const [createRoomTab,setCreateRoomTab] = useState(false)
  const[joinRoomTab,setJoinRoomTab] = useState(false)
  const [roomId , setRoomId] = useState("")
  const[username , setUsername] = useState("")
  const[maxparty , setMaxParty] = useState(2)
  const [err,setErr] = useState("")
  const navigate = useNavigate()


  function handleErr(err){
    console.log(err);
    
    setErr(err)
  }

  function navigateToRoom(){
    navigate(`/room/${roomId}?username=${username}`)
    socket.emit("getRoomInfo",{roomId})
  }

  function joinRoom(){
    if (socket.connected){
      socket.emit("joinRoom",{roomId,username})
      

    }else{
      socket.once("connect",()=>{
       socket.emit("joinRoom",roomId,username)
      })
    }
  }

  async function createRoom(){
    if (socket.connected){
      socket.emit("create-room",({admin : username , roomId,max:maxparty}))
    }else{
      socket.once("connect",()=>{
        socket.emit("create-room",({admin : username , roomId,max:maxparty}))
      })
    }
  }


    useEffect(()=>{
      if (socket.connected){
        socket.on("roomCreated",navigateToRoom)

        socket.on("failedCreatingRoom",handleErr)

        socket.on("roomjoiningFailed",handleErr)

        socket.on("roomJoined",navigateToRoom)
      }else{
        socket.once("connect")
      }

      return ()=>{
        socket.off("roomCreated",navigateToRoom)

        socket.off("failedCreatingRoom",handleErr)

        socket.off("roomjoiningFailed",handleErr)

        socket.off("roomJoined",navigateToRoom)

      }
    },[roomId,username ,maxparty])

  return (
    <>
    {
      (createRoomTab? (
        <DialogBox title={"Create A Room"} DialogColor={"#3d3f4d"} setDialog={setCreateRoomTab} onClick={createRoom} >
        <Input label={"RoomId"} placeholder={"Create a room id"} value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} />
        <Input label={"Username"} placeholder={"Enter a username"} value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <Input label={"Max Party"} type={"number"} placeholder={"max party number"} value={maxparty} onChange={(e)=>{     
          setMaxParty(e.target.value)
        }}/>
      </DialogBox>
      ) : joinRoomTab? (
        <DialogBox title={"Join A Room"} DialogColor={"#3d3f4d"}  setDialog={setJoinRoomTab} onClick={joinRoom} >
        <Input label={"Room id"} placeholder={"Enter a room id"} onChange={(e)=> {setRoomId(e.target.value)}}/>
        <Input label={"Username"}  placeholder={"Enter a username"}  onChange={(e)=> {setUsername(e.target.value)}} />
      </DialogBox>
      ):"")
    }
    <div className="flex flex-col min-h-screen bg-[#16171d]">
      {err &&(
        <div className="flex justify-between fixed min-h-fit top-0 w-full bg-red-600 px-1.5">
        <span className="text-[12px] text-gray-100 font-bold">{err}</span>
        <span><X onClick={(e)=>{
          setErr("")
        }} color="white"/></span>
      </div>
      )}
      <div className="top-section flex pt-4 pr-8">
        <button className="ml-auto bg-red-900 px-2 py-1.5 rounded-md text-gray-300">Join with A Random Person</button>
      </div>
    <div className="grow flex flex-col w-full justify-center items-center">
        <div className="heading mb-6">
          <h2 className="text-2xl font-semibold text-gray-200 tracking-wider">Connect to A Room</h2>
        </div>
        <div className="w-1/3">
          <div className="w-full flex justify-between">
          <button onClick={(e)=>{setCreateRoomTab(true)}} className="bg-green-800 text-gray-300 px-2 py-1.5 rounded-md ">Create a Room </button>
          <button onClick={(e)=>{setJoinRoomTab(true)}} className="bg-blue-900 text-gray-300 px-2 py-1.5 rounded-md">Join a Room</button>
        </div>
        </div>
        
    </div>
    </div>
    </>
  )
}

export default ConnectRoom

