import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket/socket'
import { Route, Routes } from 'react-router-dom'
import ConnectRoom from './views/ConnectRoom/ConnectRoom'
import Signin from "./views/SignIn/signin"
import Room from './views/Room/Room'
import SignUp from './views/SignUp/SignUp'

function App() {
  
return (
  <Routes>
    {/* <Route path='/' element={<Home/>}/> */}
    <Route path="/connect-room" element={<ConnectRoom/>}/>
    <Route path="/room/:roomId" element={<Room/>}/>
    <Route path = "/sign-in" element= {<Signin/>}/>
    <Route path="/sign-up" element= {<SignUp/>}/>
  </Routes>
)

    

}

export default App
