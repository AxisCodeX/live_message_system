import mongoose from "mongoose";
import {randomUUID} from "crypto"
const userSchema = new mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    privateRoomId : {
        type : String,
        unique : true
    }
},{timestamps : true})


userSchema.pre("save",async function(){
    try{
        console.log(this.privateRoomId);
        
       if (!this.privateRoomId){
         this.privateRoomId = randomUUID()
       }
    }catch(e){
        throw e
    }


})

const UserModel = mongoose.model("User",userSchema)

export default UserModel


