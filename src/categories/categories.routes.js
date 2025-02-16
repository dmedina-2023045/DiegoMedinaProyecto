import { Router } from "express"
import { addCategorie, deleteCategorie, getCategories, updateCategorie, getCategorieById, test } from "../categories/categories.controller.js"
import { validateJwt } from '../../middlewares/validator.jwt.js'

const api = Router()


api.get('/testCategory', test)
api.post('/addCategory',[validateJwt], addCategorie)
api.get('/getCategories',[validateJwt],getCategories)
api.get('/getCategorieById/:id',[validateJwt],getCategorieById)
api.put('/updateCategorie/:id',[validateJwt], updateCategorie)
api.delete('/deleteCategorie/:id',[validateJwt], deleteCategorie)

export default api
