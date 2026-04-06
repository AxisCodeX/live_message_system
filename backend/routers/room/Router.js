import express from "express"
import connectRoom from "../../controllers/room/connect-room.js"


const router = express.Router()


router.post("/connect-room",connectRoom)

export default router