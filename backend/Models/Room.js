import mongoose  from "mongoose";

const roomSchema =  new mongoose.Schema(
    {
        admin:{
            type : String,
            required : true
        },
        roomId : {
            type : String,
            required : true
        },
        max : {
            type : Number,
            required : true
        },
        currentPary : {
            type : Number,
            required : true,
            default : 0
        }
    },{
    timestamps: true
}) 

const RoomModel = mongoose.model("Room",roomSchema)

export default RoomModel