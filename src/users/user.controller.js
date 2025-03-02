import User from './user.model.js'
import argon  from 'argon2'
import {encrypt} from '../../utils/encryp.js'

const addAdmin = async () => {
    try {
        const defaultAdmin = await User.findOne({role: 'ADMIN'})
    if (!defaultAdmin) {
             const usuarioAdmin = new User({
                name: 'Diego',
                surname: 'Medina',
                username: `${process.env.ADMIN_USER}`,
                email: `${process.env.ADMIN_EMAIL}`,
                password: await encrypt(`${process.env.ADMIN_PASSWORD}`),
                phone: '45910878',
                role: "ADMIN"
            })
            await usuarioAdmin.save();
            console.log('Default administrator added succesfully')
        }
    } catch (e) {
        console.error("Error adding a default administrator", e)
    }
}
 
addAdmin()

export const getUsers = async(req ,res)=>{
    try{
        const {limit = 20, skip = 0 } = req.query
        const users = await User.find().skip(skip).limit(limit)
        if(users.length == 0) return res.status(404).send(
            {success: false, message:'Users not found'}
        )
        return res.send({success: true, message: 'Users found: ', users, total: users.length})
    }catch(e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error', e})
    }
}


export const getUserById = async(req, res)=>{
    try {
        let {id} = req.params
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
        {success: false, message: 'User not found'}
        )
        return res.send({ success: true, message: 'User found: ', user})
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({success: false, message: 'General error', err: e})
    }
}

export const updateUser = async(req, res)=>{
    try{
        const {id} = req.params
        const data = req.body
        const update = await User.findByIdAndUpdate(id, data, {new: true})
        if(!update) return res.status(404).send(
            {success: false, message: 'User not found'}
        )
        return res.send({success: true, message: 'User updated', user: update})
    }catch(e){
        console.error('General error', e)
        return res.status(500).send({success: false, message: 'General error', err: e})
    }
}

export const updatePassword = async (req, res) => {
    try {
        let {id} = req.params;
        let { newPassword, oldPassword } = req.body;
        let user = await User.findById(id);
        if (!user) return res.status(404).send(
            { message: 'User not found' }
        );
        if (!user.password) {
            return res.status(500).send({ message: 'Password not found in user data' })
        }
        let compare = await argon.verify(user.password, oldPassword);
        if (!compare) return res.status(400).send({ message: 'Incorrect Password' })
        user.password = await encrypt(newPassword)
        await user.save();
        return res.send({ message: 'Password updated successfully' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Internal Server Error', error: e.message })
    }
}

export const deleteUser = async(req, res)=>{
    try {
        const {id} = req.params
        const deleteUser= await User.findByIdAndDelete(id)
        if (!deleteUser)return res.status(404).send(
            {Message: 'User not found'}
        )
            return res.send({message: 'User deleted succesfully'})
    } catch (e) {
        console.console.log(e);
        return res.status(500).send({message: 'General Error',e})
    }   
}