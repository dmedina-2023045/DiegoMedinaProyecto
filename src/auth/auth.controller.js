import User from '../users/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{    
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        user.profilePicture = req.file?.filename ?? null 
        await user.save()
        return res.send({message: `User registration correctly done, now you can login: ${user.username}`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error with user registration', err: e})
    }
}

export const login = async(req, res)=>{
    try{
        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [ 
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) 
        console.log(user)
        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}