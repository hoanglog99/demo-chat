import { Router } from "express";
import { loginHTML, login, register } from '../controllers/user'
import { validateRegister } from '../middlewares/user'
const router = Router()

router.get('/login', loginHTML)
router.post('/login', login)
router.post('/register',validateRegister, register)

export default router