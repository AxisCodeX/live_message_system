/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate,  } from 'react-router-dom'
import configs from '../configs/config'
import { useAuth } from './AuthConstants'
function Authprotector({children}) {
   const {user,loading} = useAuth()

   if(loading == true) return <p>Loading...</p>
   if (loading== false){
    if(user===null) return <Navigate to="/sign-in" replace/>
   }

   return children
}

export default Authprotector