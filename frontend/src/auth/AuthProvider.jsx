import { useEffect, useState } from 'react'
import { AuthContext } from './AuthConstants'
import configs from '../configs/config'
import axios from 'axios'

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
    const[loading,setLoading] = useState(true)
  useEffect(()=>{
    console.log("fetching session from server");
    
    axios.get(`${configs.backend_uri}/me/session`,{
        withCredentials:true
    }).then((res) => {
        setUser(res.data.user)
    }).catch(()=>setUser(null)).finally(()=>setLoading(false))
  },[])
  return (
    <AuthContext.Provider value={{ user, setUser,loading,setLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider