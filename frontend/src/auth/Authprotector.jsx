/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate,  } from 'react-router-dom'
import configs from '../configs/config'
import { useAuth } from './AuthConstants'
function Authprotector({children}) {
   const {user} = useAuth()

   if(user == undefined) return <p>Loading...</p>
   if(!user) return <Navigate to="/sign-in" replace/>

   return children
}

export default Authprotector