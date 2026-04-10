import React,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";

function SignPageForm() {
  return (
    <div className="inset-0  bg-radial from-pink-400 from-40% to-fuchsia-700 absolute flex justify-center items-center  ">
<div className=" bg-gray-600/25 px-2.5 py-4 rounded-md  backdrop-blur-lg">
    <form action="" >
        <Input label={"Email"} type={"email"} labelVis = {true}/>
        <Input label={"Password"} type={"password"} labelVis = {true} />
        <span className="text-xs font-extralight text-white hover:text-blue-300 cursor-pointer">forgot password?</span>
        <div className="w-full flex justify-end mt-4"><button type="submit" className="bg-blue-600/25 text-sm tracking-wider backdrop-blur-2xl  px-4 py-1 rounded-md border border-gray-600 hover:border-purple-600 hover:ring-2 hover:ring-purple-600 hover:cursor-pointer transition-all duration-300 active:bg-blue-500">Log in</button></div>
    </form>
</div>
    </div>      
  )
}

export default SignPageForm