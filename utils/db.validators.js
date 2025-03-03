import User from '../src/users/user.model.js'
import Categorie from '../src/categories/categories.model.js'

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

export const existCategorie = async(name, categorie)=>{
    const alreadyCategorie = await Categorie.findOne({name})
    if(alreadyCategorie && alreadyCategorie._id != categorie.uid){
        console.error(`Categorie ${name} already exist`)
        throw new Error(`Categorie ${name} already exist`)
    }
}

