import  express from "express"



//local imports
import SignIn from "../../controllers/auth/sign-in.js"
import SignUp from "../../controllers/auth/sign-up.js"
import getSession from "../../controllers/session/getSession.js"

const router = express.Router() 



router.post("/sign-in",SignIn)
router.post("/sign-up",SignUp)
router.get("/me/session",getSession)
export default router