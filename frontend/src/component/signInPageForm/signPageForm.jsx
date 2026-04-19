import React from 'react'
import { useForm } from 'react-hook-form'
import Input from "../Input/Input"
import axios from 'axios'
import config from "../../configs/config"
import { useNavigate  } from 'react-router-dom'
import { useAuth } from '../../auth/AuthConstants'
function SIgnUpPageForm() {
  const { setUser } = useAuth()
    const {register , handleSubmit} = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data)=>{
      console.log("sending info to backend.");
      
      console.log (data)
      const res = await axios.post(`${config.backend_uri}/sign-in`,{
        email : data.email,
        password : data.password
      },{
        withCredentials:true
      })
      console.log(res);

      if (res.status === 200){
         setUser(res.data.data) 
          setTimeout(()=>{
            navigate("/home")
          },2000)
      }
      
    }
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
        <div className='headings'></div>
        <div className='from flex justify-center items-center'>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <Input type="email" label={"Email"} labelVis={true} placeholder="Enter your email." name="email" {...register("email",{required:true})}/>
              <Input type={"password"} label={"Password"} labelVis={true} placeholder=" Enter a password." name="password" {...register("password",{required : true})}/>
            </div>
            <div className='flex justify-center'>
              <button  className='bg-blue-600 px-2 py-2 rounded-md my-2 hover:bg-blue-700 active:bg-blue-500' type="submit">Create account</button>
            </div>

          </form>
        </div>
    </div>
  )
}

export default SIgnUpPageForm