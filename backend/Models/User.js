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
        required : true,
        unique : true
    }
},{timestamps : true})


const UserModel = mongoose.model("User",userSchema)

export default UserModel


userSchema.pre("save", function(next){
    try{
       if (!this.privateRoomId){
         this.privateRoomId = randomUUID()
       }
        next()
    }catch(e){
        throw new Error(e.message)
    }


})