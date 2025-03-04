import { Router } from "express"
import { addPurchase, purchaseHistorial} from "./bills.controller.js"
import { validateJwt, isAdmin} from "../../middlewares/validator.jwt.js"

const api = Router()

api.post('/addPurchase', validateJwt, addPurchase)
api.get('/purchaseHistorial', validateJwt, purchaseHistorial)
//api.put('/updateBill',[validateJwt, isAdmin], updateBill)

export default api