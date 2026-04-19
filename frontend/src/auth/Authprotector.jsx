/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate,  } from 'react-router-dom'
import configs from '../configs/config'
function Authprotector({children}) {
    const [user,setUser] = useState(undefined)
   async function fetchSession(){
        try {
            const res = await axios.get(`${configs.backend_uri}/me/session`,{
                withCredentials:true
            })

            return res.data.user
        } catch (error) {
            return null
        }
    }

    useEffect(()=>{
      (async ()=>{
        const u = await fetchSession()
        setUser(u)
      })()
    },[])
    if(user === undefined){
        return <p>Loading....</p>
    }
    if(!user){
           return <Navigate to="/sign-in"/>
        }

  return ( children )
}

export default Authprotector