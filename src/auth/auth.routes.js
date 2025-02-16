import { Router } from "express"
import {login, register, test} from "./auth.controller.js"
import {limiter} from '../../middlewares/rate.limit.js'



const api = Router()

api.post('/login', login)
api.post('/register', limiter, register)

api.get('/test', test)

export default api