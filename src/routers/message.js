import { Router } from "express";
import { createMess, getMessInRoom } from '../controllers/message'
const router = Router()

router.get('/mess/:userId&:roomId', getMessInRoom)
router.post('/mess/:user_id&:room_id', createMess)

export default router