import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket/socket'
import { Route, Routes } from 'react-router-dom'
import ConnectRoom from './views/ConnectRoom/ConnectRoom'
import Room from './views/Room/Room'

function App() {
  
return (
  <Routes>
    {/* <Route path='/' element={<Home/>}/> */}
    <Route path="/connect-room" element={<ConnectRoom/>}/>
    <Route path="/room/:roomId" element={<Room/>}/>
  </Routes>
)

    

}

export default App
