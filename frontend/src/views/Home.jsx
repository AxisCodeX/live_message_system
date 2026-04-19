import axios from 'axios'
import React from 'react'
import configs from '../configs/config'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthConstants'

function Home() {
    const navigate = useNavigate()
    const {setUser,setLoading} = useAuth()

    async function logOut(){
        const res = await axios.post(`${configs.backend_uri}/sign-out`,{},{withCredentials:true})
        if (res.status == 200){
           
                setUser(null)
           
            navigate("/sign-in")
            
        }
    }
  return (
    <div><button onClick={logOut}>LogOut</button></div>
  )
}

export default Home