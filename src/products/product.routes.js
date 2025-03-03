import { Router } from "express";
import { getProducts, addProduct, getProductById, updateProduct, deleteProduct} from "./prouct.controller.js";
import {validateJwt, isAdmin} from '../../middlewares/validator.jwt.js'

const api = Router()

api.post('/addProduct',[validateJwt, isAdmin], addProduct)
api.get('/getProducts',[validateJwt], getProducts)
api.get('/getProductById/:id',[validateJwt], getProductById)
api.put('/updateProduct/:id',[validateJwt, isAdmin], updateProduct)
api.delete('/deleteProduct/:id', [validateJwt, isAdmin], deleteProduct)

export default api