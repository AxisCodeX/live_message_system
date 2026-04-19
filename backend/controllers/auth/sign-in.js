import { ApiError } from "../../Helpers/ApiError.js"
import UserModel from "../../Models/User.js"
import bcrypt from "bcryptjs"


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

        const ispasswordCorrect = await bcrypt.compare(password , user.password)
        if (!ispasswordCorrect){
            throw new ApiError("incorrect password", 401)
        }

        req.session.user = {
            id : user._id,
            email : user.email
        }

        return res.status(200).json(
            {
                message : "user logged in successfully",
                success : true,
                data : {
                    username : user.username,
                    email : user.email
                }
            }
        )

        
    } catch (error) {
        console.log(error);
        
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


export default SignIn