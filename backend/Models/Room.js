import mongoose  from "mongoose";

const roomSchema =  new mongoose.Schema(
    {
        admin:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
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