const { ApiError } = require("../../../Helpers/ApiError")
const { default: UserModel } = require("../../../Models/User")


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