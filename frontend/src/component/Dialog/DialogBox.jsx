import React,{useState , useEffect} from "react";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import Input from "../Input/Input";
function DialogBox({
    onClick,
    DialogColor,
    title,
    setDialog,
    children,
}) {
  return (
    <div  className="absolute inset-0 flex items-center justify-center bg-transparent">
        <div className="w-full flex-col max-w-md bg-[#3d3f4d] p-6 rounded-xl">
            <div className="w-full text-center">
                <h3 className="text-gray-200 font-semibold tracking-wider">
                    {title}
                </h3>
            </div>
        <div className="flex flex-col ">
            {children}
        </div>
        <div className="flex justify-between">
            <button className="cancel" onClick={()=>{setDialog(false)}}><X color="red" size={50} className="p-1.5 hover:bg-gray-600 rounded-md " /></button>
            <button className="create" onClick={onClick}><Check color="green" size={50} className="p-1.5 hover:bg-gray-600 rounded-md"/></button>
        </div>
        </div>
    </div>
  )
}

export default DialogBox