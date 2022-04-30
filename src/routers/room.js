import { Router } from "express";
import { getRoom, createRoom } from '../controllers/room'
const router = Router()

router.get('/room/:userId', getRoom)
router.post('/room', createRoom)

export default router