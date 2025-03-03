import {Schema, model} from 'mongoose'

const billSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    nit:{
        type: String,
        required: [true, 'NIT is required']
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default model('Bill', billSchema)