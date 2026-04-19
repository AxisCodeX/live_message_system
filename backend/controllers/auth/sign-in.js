import { ApiError } from "../../Helpers/ApiError"
import UserModel from "../../Models/User"




const SignIn = async (req,res)=>{
    try {
        const {email , password} = req.body
        
        if ([email , password].some((e)=> e=="")){
            throw new ApiError("please provide all the credientials", 401)

        }

        const user = await UserModel.findOne(
            {
                email
            }
        )

        if (!user){
            throw new ApiError("user not found", 404)
        }

        const ispasswordCorrct = await bcrypt.compare(password , user.password)
        if (!ispasswordCorrct){
            throw new ApiError("incorrect password", 401)
        }

        req.session.user = {
            id : user._id,
            email : user.email
        }

        return res.status(200).json(
            {
                message : "user logged in successfully",
                success : true
            }
        )

        
    } catch (error) {
        if (error instanceof ApiError){
            return res.status(error.status).json(
                {
                    message : error.message,
                    success : false
                }
            )
        }
        return res.status(500).json(
            {
                message : "failed to login user.",
                success : false
            }
        )
    }
}