import { Router } from "express"
import {deleteUser, updateUser, getUsers , getUserById, updatePassword} from './user.controller.js'
import { validateJwt } from '../../middlewares/validator.jwt.js'
import {updateUserValidator} from '../../middlewares/validator.js'


const api = Router()



api.get('/getUsers',[validateJwt],getUsers)
api.get('/getUserById/:id',[validateJwt],getUserById)
api.put('/updateUser/:id',[validateJwt , updateUserValidator], updateUser)
api.put('/updatePassword/:id',[validateJwt], updatePassword)
api.delete('/deleteUser/:id',[validateJwt],deleteUser)


export default api