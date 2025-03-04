import User from '../src/users/user.model.js'
import Categorie from '../src/categories/categories.model.js'
import Product from '../src/products/product.model.js'

export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email}) 
        if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(e){
        console.error(e)
        return false
    }
}

export const existCategorie = async (categorieId) => {
    const categorie = await Categorie.findById(categorieId)
    if (!categorie) {
        console.error(`Product ${categorieId} not exist`)
        throw new Error(`Product ${categorieId} not exist`)
    }
}

export const existProduct = async (productId) => {
    const product = await Product.findById(productId)
    if (!product) {
        console.error(`Product ${productId} not exist`)
        throw new Error(`Product ${productId} not exist`)
    }
}

