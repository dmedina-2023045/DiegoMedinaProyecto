'use strict'

import {model, Schema} from 'mongoose'

const shoppingCartSchema = Schema ({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Customer is required']
    },
    products: {
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'product',
            required:[true, 'Product is required']
        }]
    },
    quantity: {
        type: [{
            type: Number,
            required: [true, 'Quantity is required']
        }]
    },
    total: {
        type: Number,
        required: [true, 'Total is required']
    }
})

export default model ('shoppingCart', shoppingCartSchema)

