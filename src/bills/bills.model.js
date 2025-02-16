'use strict'

import {model, Schema} from 'mongoose'

const invoiceSchema = Schema ({
    NIT: {
        type: String,
        required: true 
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref:'cart',
        required: true
    },
    products: {
        type:[{
            type: Schema.Types.ObjectId,
            ref: 'product',
            required:true
        }]
    },
    quantity: {
        type: [{
            type: Number,
            required: true
        }]
    },
    date: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true,
        uppercase: true,
        enum: ['CARD', 'CASH']
    },
    total: {
        type: Number,
        required: true
    }, 
    status: {
        type: Boolean,
        default: true
    }
})

export default model('invoice', invoiceSchema)