import {Router} from "express"
import {addToCart, removeFromCart, getCart} from './cart.controller.js'
import {validateJwt} from '../../middlewares/validator.jwt.js'

const api = Router()

api.post('/addToCart', validateJwt, addToCart)
api.post('/removeFromCart',validateJwt, removeFromCart)
api.get('/getCart', validateJwt, getCart)


export default api