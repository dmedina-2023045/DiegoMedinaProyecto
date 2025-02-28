'use strict'

import { Schema, model } from "mongoose"

const categorieSchema = Schema ({
    name: {
        type: String,
        required: [true,'Name is required'],
        maxLength: [25, `Can't be overcome 25 characters`]
        
    },
    description: {
        type: String,
        required: true,
        maxLength: [128, `Can't be overcome 128 characters`]
    }
})

export default model('Categorie', categorieSchema)