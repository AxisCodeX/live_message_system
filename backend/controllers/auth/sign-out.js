import { ApiError } from "../../Helpers/ApiError.js";


async function SignOut(req,res){
    try {
        req.session.destroy((err)=>{
            if(err){
                return res.status(500).json(
                    {
                        message : "logout failed"
                    }
                )
            }

            res.clearCookie("connect.sid")
            return res.json(
                {
                    message : "Logout successful."
                }
            )
        })
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
                    message : "Server Error",
                    success : false
                }
            )
    }
}