import { ApiError } from "../../../Helpers/ApiError.js"
import UserModel from "../../../Models/User.js"


const isEmailAvailable = async (email)=>{
    try {
        const users = UserModel.find(
            {email}
        )
        return users == null
    } catch (error) {
        throw new ApiError("failed to evaluate email.",409)
    }
}

export {isEmailAvailable}