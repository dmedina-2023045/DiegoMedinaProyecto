'use strict'

import express from 'express' 
import morgan from 'morgan' 
import helmet from 'helmet' 
import cors from 'cors' 
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/user.routes.js'
import categoriesRoutes from '../src/categories/categories.routes.js'
import productRoutes from '../src/products/product.routes.js'

import {limiter} from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) 
}

const routes = (app)=>{
    app.use(authRoutes)
    app.use(userRoutes)
    app.use(categoriesRoutes)
    app.use(productRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}