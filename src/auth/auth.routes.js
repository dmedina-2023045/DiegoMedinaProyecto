import { Router } from "express"
import {login, register, test} from "./auth.controller.js"
import {limiter} from '../../middlewares/rate.limit.js'
import { registerValidator } from "../../middlewares/validator.js"



const api = Router()

api.post('/login',limiter, login)
api.post('/register', [registerValidator , limiter], register)

api.get('/test', test)

export default api