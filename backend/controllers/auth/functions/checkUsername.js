import { ApiError } from "../../../Helpers/ApiError.js"
import UserModel from "../../../Models/User.js"

const isUsernameAvailable = async (username)=>{
    try {
        const users = await UserModel.findOne({username})
        return users == null
    } catch (error) {
        throw new ApiError("username already exists.",409)
    }
}


export {isUsernameAvailable}