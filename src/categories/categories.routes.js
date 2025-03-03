import { Router } from "express"
import { addCategorie, deleteCategorie, getCategories, updateCategorie, getCategorieById, test } from "../categories/categories.controller.js"
import { validateJwt, isAdmin} from '../../middlewares/validator.jwt.js'
import { addCategorieValidator } from "../../middlewares/validator.js"

const api = Router()


api.get('/testCategory', test)
api.post('/addCategory',[validateJwt, isAdmin, addCategorieValidator], addCategorie)
api.get('/getCategories',[validateJwt],getCategories)
api.get('/getCategorieById/:id',[validateJwt],getCategorieById)
api.put('/updateCategorie/:id',[validateJwt, isAdmin], updateCategorie)
api.delete('/deleteCategorie/:id',[validateJwt, isAdmin], deleteCategorie)

export default api
