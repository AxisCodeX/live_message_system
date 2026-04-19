/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ConnectRoom from './views/ConnectRoom/ConnectRoom'
import Signin from "./views/SignIn/signin"
import Room from './views/Room/Room'
import SignUp from './views/SignUp/SignUp'
import axios from 'axios'
import Authprotector from './auth/Authprotector'
import Home from './views/Home'
function App() {
    
return (
  <Routes>
    {/* <Route path='/' element={<Home/>}/> */}
    <Route path="/connect-room" element={
      <Authprotector>
        <ConnectRoom/>
      </Authprotector>
      
      }/>
    <Route path="/room/:roomId" element={
      <Authprotector>
        <Room/>
      </Authprotector>}
      />
      <Route path  = "/home" element={
        <Authprotector>
          <Home/>
        </Authprotector>
      }/>
    <Route path = "/sign-in" element= {<Signin/>}/>
    <Route path="/sign-up" element= {<SignUp/>}/>
  </Routes>
)

    

}

export default App
