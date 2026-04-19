import {ApiError } from "../../Helpers/ApiError.js"
import bcrypt from "bcryptjs"
import { isUsernameAvailable } from "./functions/checkUsername.js"
import { isEmailAvailable } from "./functions/chekEmail.js"
import UserModel from "../../Models/User.js"
async function SignUp (req,res){
    try {
        const {email , username , password }= req.body
        if ([email, username ,password].some((e)=>e=="")){
            throw new ApiError("please provide all the credentials",401)
        }

        const UsernameAvailable = await isUsernameAvailable(username)

        if(! isUsernameAvailable){
            throw new  ApiError("username already exists",409)
        }
        const EmailAvailable = await isEmailAvailable(email)
        console.log(EmailAvailable);
        
        if (!EmailAvailable){
            throw new  ApiError("email already used", 409)

        }
        const hashedPassword = await bcrypt.hash(password , 10)


        const user = new UserModel({
            email ,
            username,
            password : hashedPassword
        })

        await user.save()

        return res.status(200).json(
            {
                message : "successfully created a new user .",
                data : user,
                success : true
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
                message : "Failed to create a account",
                success : false
            }
        )
    }
}

export default  SignUp