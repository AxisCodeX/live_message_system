const { ApiError } = require("../../../Helpers/ApiError")
const { default: UserModel } = require("../../../Models/User")

const isUsernameAvailable = async (username)=>{
    try {
        const users = await UserModel.find({username})
        return users == null
    } catch (error) {
        throw new ApiError("username already exists.",409)
    }
}


export {isUsernameAvailable}